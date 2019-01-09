import React from 'react'
import {Redirect} from 'react-router'
import * as backgroundImage from "../assets/img/MIH_6583.JPG";
import "../assets/stylesheets/homepage.css"
import Navbar from './Navbar';
import InfoMenu from './InfoMenu.js'


export default class Homepege extends React.Component {

    constructor() {
        super();
        this.state = {
            redirect: null,
            icons:[
            "shield",
            "mt",
            "path",
            "crux",
            "vase",
            "book-icon"
        ],
            items:[
                "Istorie",
                "Geogrefie",
                "Turism",
                "Religie",
                "Legende",
                "Bibliografie"
        ]
        }
    }
    redirectToMap = () => {
        this.setState({
            redirect: (<Redirect to="/map"></Redirect>)
        })
    }

    render() {
        return (
            <div id="main-flex-continer">
                <Navbar></Navbar>
                <div id="image-container">
                    <img id="main-image" src={backgroundImage} alt="bozioru"></img>
                    <div id="main-text-container">
                        <h2 id="title-up">Asezarile Rupestre</h2>
                        <h1 id="title-down">Bozioru</h1>
                        <br className="sm-break"></br>
                        <p id="description">O întoarcere în peisajul creștinismului timpuriu,
                        unde pietrele spun povestea locului de la începutul istoriei și până acum.</p>
                        <button id="map-button" onClick={this.redirectToMap}>Catre harta</button>
                        {this.state.redirect}
                    </div>
                </div>
                <InfoMenu icons={this.state.icons} items={this.state.items}/>
            </div>
        )
    }
}