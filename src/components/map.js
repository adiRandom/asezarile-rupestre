/**
 * Created by Adrian on 29-Aug-18.
 */

import React from "react";
import Navbar from './Navbar'
import { properties } from "../properties/properties";
import "bootstrap/dist/js/bootstrap.min";
import * as classNames from "classnames";
import "../assets/stylesheets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import { routeCoordinates } from "../properties/route.js"
import objectives from "../properties/objectives.js"



export default class MapContainer extends React.Component {
    constructor(props) {

        super(props)

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
            map:null,
            count: 0 //Variable responsable with indexing the current objective that is being displayed
        };


        //Function binding
        this.clickHandler = this.clickHandler.bind(this);
        this.zoomContinuation = this.zoomContinuation.bind(this);
        this.goToRoute = this.goToRoute.bind(this);
        this.setEndReached = this.setEndReached.bind(this);
        this.transitionToIndividual = this.transitionToIndividual.bind(this);
        this.goToObjective = this.goToObjective.bind(this);

        //Ref to the underlying map container
        this.mapRef = React.createRef();
    }

    componentWillMount() {
        // Start Google Maps API loading since we know we'll soon need it
    }

    async componentDidMount() {
        //Create the map
        await this.getGoogleMaps().then((google)=>{
                console.log(this.mapRef);
            const map = new google.maps.Map(this.mapRef.current, {
                    zoom: 4,
                    center: {
                        lat:45.3833472,
                        lng:26.4745782 
                    }
                });

                this.setState({
                    map:map
                },()=>console.log(this.state))
        })

        /* //Set the style of the map
        this.state.map.mapTypeId = 'hybrid';

        //Init the border

        this.border = new window.google.maps.Polygon({
            paths: this.state.borderSrc,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 5,
            fillColor: '#FF0000',
            fillOpacity: 0
        });
        this.border.setMap(this.state.map);

        //Add the function to a variable to call it in the event block below

        var clickHandler = this.clickHandler;

        //Add the click listener for the polygon
        window.google.maps.event.addListener(this.border, 'click', function (event) {

            clickHandler();

        });
 */

    }

    getGoogleMaps = ()=> {
            const googleMapsPromise = new Promise((resolve) => {
                // Add a global handler for when the API finishes loading
                window.resolveGoogleMapsPromise = () => {
                    // Resolve the promise
                    resolve(window.google);
                };

                // Load the Google Maps API
                if(!document.getElementById("script")){
                    const script = document.createElement("script");
                    const API = 'AIzaSyDbAz1XXxDoKSU2nZXec89rcHPxgkvVoiw';
                    script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
                    script.async = true;
                    document.body.appendChild(script);
                }
            });

        // Return a promise for the Google Maps API
        return googleMapsPromise;
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
            this.border.setMap(this.state.map);
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
        else if (this.state.stage == 3){
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

            zoom: 15, //Zoom out in order to see the route
            endReached: false //Make the renderer not go back and forth between the objective and the route


        }, () => {
            route.setMap(this.state.map);
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
        import ('../assets/img/back1.png').then((img)=>{
            console.log('Hey');
            infoWindow = new window.google.maps.InfoWindow({
            content: `<h1>Hello</h1>` + `<img src =${img} height = 300px width=300px >`
        });
        var marker = new window.google.maps.Marker({
            position: objectives.objective[this.state.count].center,
            map: this.state.map,
            title: 'Titlu'
        });

        infoWindow.open(this.state.map, marker); //Dispaly the infowindow
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
                        {/* <Map google={this.props.google} style={{ height: "100%" }}
                            initialCenter={this.state.initCenter} center={this.state.center} onClick={this.clickHandler}
                            zoom={this.state.zoom}
                            ref={this.mapRef} /> */}
                        <div id='map' ref = {this.mapRef}></div>
                    </div>
                </div>
            </div>
        );
    }
}



