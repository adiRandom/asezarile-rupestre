/**
 * Created by Adrian on 29-Aug-18.
 */

import React from "react";
import {properties} from "../properties/properties";
import {GoogleApiWrapper, Map} from "google-maps-react";
import "bootstrap/dist/js/bootstrap.min";
import * as classNames from "classnames";
import "../assets/stylesheets/main.css";
import "bootstrap/dist/css/bootstrap.css";

import * as image from "../assets/img/traseu.png";


export class MapContainer extends React.Component {


    //TODO:After romania and buzao switch to a img of the map outlined

    constructor(props) {

        super(props);

        //Manipulate the page background
        document.getElementsByTagName("body")[0].style.background = `linear-gradient(45deg, #00537e 0%,#3aa17e 100%)`;
        document.getElementsByTagName("body")[0].style.backgroundRepeat = `no-repeat`;
        document.getElementsByTagName("body")[0].style.backgroundAttachment = `fixed`;
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
            endReached: false
            // Property to track whether you can advance to the next slide or not
        };


        this.clickHandler = this.clickHandler.bind(this);
        this.goToRomania = this.goToRomania.bind(this);
        this.goToBuzau = this.goToBuzau.bind(this);
        this.goToBozioru = this.goToBozioru.bind(this);
        this.zoomContinuation = this.zoomContinuation.bind(this);
        this.toDemo = this.toDemo.bind(this);

        this.goToRoute = this.goToRoute.bind(this);
        this.setEndReached = this.setEndReached.bind(this);

        this.mapRef = React.createRef();


    }

    componentDidMount() {


        this.mapRef.current.map.mapTypeId = 'hybrid';


        /*var directionsService = new window.google.maps.DirectionsService;
         var directionsDisplay = new window.google.maps.DirectionsRenderer;
         directionsDisplay.setMap(this.mapRef.current.map);
         directionsService.route({
         origin: "Buzau",
         destination: "Brasov",
         travelMode: 'DRIVING'
         }, function(response, status) {
         if (status === 'OK') {
         directionsDisplay.setDirections(response);
         } else {
         window.alert('Directions request failed due to ' + status);
         }
         });*/

    }


    //TODO: Make the demo open in a new tab

    toDemo() {

        let window = window.open('/demo', 'Tour');
        window.focus();

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

            setTimeout(this.clickHandler, 3000); //Move along
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

                }
            }, () => setTimeout(this.zoomContinuation, 558));  //Time required between the stages

        }
    }

    setEndReached() {

        this.setState({endReached: true});

    }

    zoomContinuation() {

        this.setState({
            zoom: properties.bozioru_map_properties.zoom
        }, () => setTimeout(this.setEndReached, 3000));  //Finish the zoom to Bozioru
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

        //TODO: After a couple of seconds add the path (code sample above)

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

    goToRoute() {


        this.element = ( <React.Fragment><img src={image} style={{width: "100%", height: "100%"}}/></React.Fragment>);
        this.forceUpdate();
    }

    render() {

        if (this.state.endReached) {

            setInterval(this.goToRoute, 12000);


        }
        else {

            this.element = (<React.Fragment><Map google={this.props.google} style={{height: "100%"}}
                                                 initialCenter={this.state.initCenter} center={this.state.center}
                                                 zoom={this.state.zoom} onClick={this.clickHandler}
                                                 ref={this.mapRef}/></React.Fragment>)

        }


        return (

            <div className="mapContainer">
                <div className="row w-100 m-0">
                    <div className="col-12" style={{height: "100vh", padding: 0}}>
                        {this.element}
                    </div>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: properties.maps_api_key
})(MapContainer)


