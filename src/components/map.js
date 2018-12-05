/**
 * Created by Adrian on 29-Aug-18.
 */

import React from "react";
import Navbar from './Navbar'
import * as properties from "../properties/properties.json";
import { GoogleApiWrapper, Map } from "google-maps-react";
import "bootstrap/dist/js/bootstrap.min";
import * as classNames from "classnames";
import "../assets/stylesheets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import * as routeCoordinates from "../properties/route.json"
import * as objectives from "../properties/objectives.json"




export class MapContainer extends React.Component {
    constructor(props) {

        super(props);

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
            routeDisplay: "none",
            count: 0 //Variable responsable with indexing the current objective that is being displayed
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
        this.transitionToIndividual = this.transitionToIndividual.bind(this);
        this.goToObjective = this.goToObjective.bind(this);

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


    }


    toDemo() {

    window.open('/tur', 'Tour');
    
    }

    clickHandler() {

        //The first click triggers the 3 stage transition

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

        }
        else if (this.state.stage === 3){
            this.goToRoute();
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
            }, () => setTimeout(() => this.setState({ zoom: properties.rupestre_map_properties.zoom },()=> //Go to the route
            setTimeout(this.clickHandler,2700))), 480) //Continue the animation to Asezarile Rupestre
        }
        else {

            this.setState({
                zoom: properties.bozioru_map_properties.zoom //Continue the animation to Bozioru
            });
            setTimeout(this.clickHandler, 4000); //Move along
        }
    }




    //Function to handle button base navigation
    //NOT USED

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

    //Display the route
    goToRoute() {

        //TODO: Create a polyline
        const route = new window.google.maps.Polyline({
            path: routeCoordinates.coordinates,
            geodesic: true,
            strokeColor: '#fffc0d',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        this.setState({

            zoom: objectives.initial.zoom, //Zoom out in order to see the route
            center:objectives.initial.center, //Ceter the image
            endReached: false //Make the renderer not go back and forth between the objective and the route


        }, () => {
            route.setMap(this.mapRef.current.map);
            this.transitionToIndividual();  //Call the function responsable with shwoing each objective throughout the route
        });
    }

    transitionToIndividual() {
        setTimeout(this.goToObjective, 3000);
    }

    goToObjective() { //Start going to the individual points after 3 seconds
        if (this.state.count < objectives.objective.length)
            this.setState({
                center: objectives.objective[this.state.count].center,
            }, () => setTimeout(this.zoomToObjective, 700))
    }

    zoomToObjective = () => {
        this.setState({
            zoom: objectives.objective[this.state.count].zoom
        }, () => setTimeout(this.addObjectiveMarker, 2000))
    }

    addObjectiveMarker = () => { //After zooming in show the marker on the map
        //Add a marker and a info window
        let infoWindow;
        const _objectives = objectives; //Copy the imported object into a local variable to access it in the import statement
        import(`../assets/img/${_objectives.objective[this.state.count].picture}`).then((img)=>{
            infoWindow = new window.google.maps.InfoWindow({
            content: `<h1>${_objectives.objective[this.state.count].name}</h1>` + `<img src =${img} height = 300px width=300px >`
        });
        var marker = new window.google.maps.Marker({
            position: _objectives.objective[this.state.count].center,
            map: this.mapRef.current.map,
            title: 'Titlu'
        });

        infoWindow.open(this.mapRef.current.map, marker); //Dispaly the infowindow
        setTimeout(() => this.removeObjectiveMarker(marker, infoWindow), 5000);
    });
    }

    removeObjectiveMarker = (marker, infoWindow) => { //After a second remove the marker, zoom back out and increase the counter
        //Remove the marker and the info windows
        marker.setMap(null);
        infoWindow.close();
        setTimeout(this.resetToCenter, 2000) //reset to the route
    }

    resetToCenter = () => {
        this.setState((prev)=>({
            zoom: objectives.initial.zoom, //First zoom out then with a callback re-center the route
            count: prev.count + 1
        }), () => setTimeout(() =>
            this.setState({
                center: objectives.initial.center
            }, () => setTimeout(this.goToObjective, 1000)), 500)
        )
    }
    render() {
        return (


            <div className="mapContainer">
                <Navbar />
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


