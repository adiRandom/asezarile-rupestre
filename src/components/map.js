/**
 * Created by Adrian on 29-Aug-18.
 */

import React from "react";
import Navbar from './Navbar'
import { properties } from "../properties/properties";
import { GoogleApiWrapper, Map } from "google-maps-react";
import "bootstrap/dist/js/bootstrap.min";
import * as classNames from "classnames";
import "../assets/stylesheets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import { routeCoordinates } from "../properties/route.js"




export class MapContainer extends React.Component {


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
            // Property to track whether you can advance to the next slide or not
            endReached: false,
            borderSrc: properties.Romania,
            //True if we display the route img
            routeDisplay: "none"
        };


        //Function binfing
        this.clickHandler = this.clickHandler.bind(this);

        //Can be removed
        ///////////////////////////////////////////////
        this.goToRomania = this.goToRomania.bind(this);
        this.goToBuzau = this.goToBuzau.bind(this);
        this.goToBozioru = this.goToBozioru.bind(this);
        ///////////////////////////////////////////////


        this.zoomContinuation = this.zoomContinuation.bind(this);

        //Not used right now
        this.toDemo = this.toDemo.bind(this);

        this.goToRoute = this.goToRoute.bind(this);
        this.setEndReached = this.setEndReached.bind(this);

        //Ref to the underlying map
        this.mapRef = React.createRef();


    }

    componentDidMount() {

        //Set the style of the map
        this.mapRef.current.map.mapTypeId = 'hybrid';

        //Init the border

        this.border = new window.google.maps.Polygon({
            paths: this.state.borderSrc,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 5,
            fillColor: '#FF0000',
            fillOpacity: 0
        });
        this.border.setMap(this.mapRef.current.map);

        //Add the function to a variable to call it in the event block below

        var clickHandler = this.clickHandler;

        //Add the click listener for the polygon
        window.google.maps.event.addListener(this.border, 'click', function (event) {

            clickHandler();

        });


        //Sample code to create a route

        ///////////////////////////////////////////////////////////////////////////
        /* var directionsService = new window.google.maps.DirectionsService;
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
        //////////////////////////////////////////////////////////////////////////////

    }


    toDemo() {

        let window = window.open('/tur', 'Tour');
        window.focus();

    }

    clickHandler() {

        //The first click triggers the 2 stage transition

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
                    rupestre: classNames({

                        'active': false,
                        'nav-link': true

                    })

                },
                borderSrc: properties.Buzau
            });

            this.border = new window.google.maps.Polygon({
                paths: this.state.borderSrc,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 5,
                fillColor: '#FF0000',
                fillOpacity: 0
            });
            this.border.setMap(this.mapRef.current.map);
            setTimeout(this.clickHandler, 3000); //Move along
        }
        else if (this.state.stage === 1) {

            this.setState({

                zoom: properties.bozioru_map_properties.zoom - 3.5,   //Bozioru stage - intermediate stat
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
                    rupestre: classNames({

                        'active': false,
                        'nav-link': true

                    })

                }

            }, () => setTimeout(this.zoomContinuation, 650))


        }
        else if (this.state.stage === 2) {

            this.setState({
                //Asezarile rupestre stage - intermediary
                center: properties.rupestre_map_properties.center,
                stage: 3,
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
                        'active': false,
                        'nav-link': true
                    }),
                    rupestre: classNames({

                        'active': true,
                        'nav-link': true

                    })

                }
            }, () => setTimeout(this.zoomContinuation, 650));
            this.setEndReached();

        }
    }


    //Mark that the transition got to an end and we can go to the map IMG
    setEndReached() {

        //Mark that the route image should be displayed
        this.setState({ endReached: true });

    }

    zoomContinuation() {

        if (this.state.stage === 3) {
            this.setState({
                center: { 
                    lat: properties.rupestre_map_properties.center.lat + 0.02, 
                    lng: properties.rupestre_map_properties.center.lng 
                }
            }, () => setTimeout(()=>this.setState({ zoom: properties.rupestre_map_properties.zoom})),480) //Continue the animation to Asezarile Rupestre

            console.log(this.state.center);
        }
        else {

            this.setState({
                zoom: properties.bozioru_map_properties.zoom //Continue the animation to Bozioru
            });
            setTimeout(this.clickHandler, 4000); //Move along
        }
    }




    //Function to handle button base navigation

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

    //GO to the map IMG
    goToRoute() {

        //TODO: Create a polyline
        const route = new window.google.maps.Polyline({
            path: routeCoordinates.coordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        this.setState({

            zoom:15 //Zoom out in order to see the route


        },()=> route.setMap(this.mapRef.current.map));

       

    }

    render() {

        //Check if the end has been reached then start the countdown or else show the map
        if (this.state.endReached) {

            setInterval(this.goToRoute, 2700);


        }


        return (


            <div className="mapContainer">
            <Navbar/>
                <div className="row m-0">
                    <div className="col-12" style={{ height: "86.5vh", padding: 0 }}>
                            <Map google={this.props.google} style={{ height: "100%" }}
                                initialCenter={this.state.initCenter} center={this.state.center} onClick={this.clickHandler}
                                zoom={this.state.zoom}
                                ref={this.mapRef} />
                    </div>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: properties.maps_api_key
})(MapContainer)


