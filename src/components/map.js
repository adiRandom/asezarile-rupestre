/**
 * Created by Adrian on 29-Aug-18.
 */

import React, {Component} from "react";
import {properties} from "../properties/properties";
import {GoogleApiWrapper, Map} from "google-maps-react";
import "bootstrap/dist/js/bootstrap.min";
import * as classNames from "classnames";
import next from "../assets/icons/next.png";


export class MapContainer extends React.Component {


    constructor() {

        super();

        //Init the state
        this.state = {
            zoom: properties.romania_map_properties.zoom,
            initCenter: properties.romania_map_properties.center,
            center: properties.romania_map_properties.center,
            stage: 0,
            classes: {

                romania: classNames({
                    'active': true,
                    'nav-link': true
                }),
                buzau: classNames({
                    'active': false,
                    'nav-link': true
                }),
                bozioru: classNames({
                    'active': false,
                    'nav-link': true
                }),

            },
            endReached: false // Property to track whether you can advance to the next slide or not
        }

        this.clickHandler = this.clickHandler.bind(this);
        this.goToRomania = this.goToRomania.bind(this);
        this.goToBuzau = this.goToBuzau.bind(this);
        this.goToBozioru = this.goToBozioru.bind(this);
        this.zoomContination = this.zoomContination.bind(this);

    }

    clickHandler() {

        //After every click move to the next stage of the presentation

        if (this.state.stage === 0) {
            this.setState({
                zoom: properties.buzau_map_properties.zoom,   //Buzau stage
                center: properties.buzau_map_properties.center,
                stage: 1,
                classes: {

                    romania: classNames({
                        'active': false,
                        'nav-link': true
                    }),
                    buzau: classNames({
                        'active': true,
                        'nav-link': true
                    }),
                    bozioru: classNames({
                        'active': false,
                        'nav-link': true
                    }),

                }
            });
        }
        else if (this.state.stage === 1) {

            this.setState({
                zoom: properties.bozioru_map_properties.zoom - 3.5,   //Bozioru intermediate stage - zoom efect not working when zooming to much to fast
                center: properties.bozioru_map_properties.center,
                stage: 2,
                classes: {

                    romania: classNames({
                        'active': false,
                        'nav-link': true
                    }),
                    buzau: classNames({
                        'active': false,
                        'nav-link': true
                    }),
                    bozioru: classNames({
                        'active': true,
                        'nav-link': true
                    }),

                },
                endReached: true
            }, () => setTimeout(this.zoomContination, 558));  //Time required between the stages

        }
    }

    zoomContination() {

        this.setState({zoom: properties.bozioru_map_properties.zoom});  //Finish the zoom to Bozioru

    }


    //Function to handle the Romania nav

    goToRomania() {

        this.setState({
            zoom: properties.romania_map_properties.zoom,   //Romania link
            center: properties.romania_map_properties.center,
            stage: 0,
            classes: {

                romania: classNames({
                    'active': true,
                    'nav-link': true
                }),
                buzau: classNames({
                    'active': false,
                    'nav-link': true
                }),
                bozioru: classNames({
                    'active': false,
                    'nav-link': true
                }),

            }
        });

    }


    goToBuzau() {

        this.setState({
            zoom: properties.buzau_map_properties.zoom,   //Buzau link
            center: properties.buzau_map_properties.center,
            stage: 1,
            classes: {

                romania: classNames({
                    'active': false,
                    'nav-link': true
                }),
                buzau: classNames({
                    'active': true,
                    'nav-link': true
                }),
                bozioru: classNames({
                    'active': false,
                    'nav-link': true
                }),

            }
        });

    }


    goToBozioru() {

        this.setState({
            zoom: properties.bozioru_map_properties.zoom,   //Bozioru link
            center: properties.bozioru_map_properties.center,
            stage: 2,
            classes: {

                romania: classNames({
                    'active': false,
                    'nav-link': true
                }),
                buzau: classNames({
                    'active': false,
                    'nav-link': true
                }),
                bozioru: classNames({
                    'active': true,
                    'nav-link': true
                }),

            },
            endReached: true
        });

    }

    render() {

        if (this.state.endReached)

            var links = ( <React.Fragment>
                <a className={this.state.classes.romania} data-toggle="pill" role="tab"
                   onClick={this.goToRomania}>Romania</a>
                <a className={this.state.classes.buzau} data-toggle="pill" role="tab" onClick={this.goToBuzau}>Buzau</a>
                <a className={this.state.classes.bozioru} data-toggle="pill" role="tab"
                   onClick={this.goToBozioru}>Bozioru</a>
                <a className="nav-link" data-toggle="pill" role="tab"
                >Catre demo<span><img alt="next" src={next}/></span></a>
            </React.Fragment>) /*TODO:Add the demo -> create the function,link,component and add the button action*/
        else
            var links = ( <React.Fragment>
                <a className={this.state.classes.romania} data-toggle="pill" role="tab"
                   onClick={this.goToRomania}>Romania</a>
                <a className={this.state.classes.buzau} data-toggle="pill" role="tab" onClick={this.goToBuzau}>Buzau</a>
                <a className={this.state.classes.bozioru} data-toggle="pill" role="tab"
                   onClick={this.goToBozioru}>Bozioru</a>
            </React.Fragment>)

        return (
            <div className="row bg-secondary w-100 m-0">
                <div className="col-2" style={{height: "100vh", padding: 0}}>
                    <div className="nav flex-column nav-pills nav-fill text-light" id="v-pills-tab" role="tablist"
                         aria-orientation="vertical">
                        {links}
                    </div>
                </div>
                <div className="col-10" style={{height: "100vh", padding: 0}}>
                    <Map google={this.props.google} style={{height: "100%"}}
                         initialCenter={this.state.initCenter} center={this.state.center}
                         zoom={this.state.zoom} onClick={this.clickHandler}/>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: properties.maps_api_key
})(MapContainer)


