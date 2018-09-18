/**
 * Created by Adrian on 29-Aug-18.
 */

import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import background from "../assets/img/back1.png";
import Navbar from '../components/Navbar';
import {CSSTransitionGroup} from "react-transition-group";


import "../assets/stylesheets/main.css"
import "../assets/stylesheets/animation.css"

class Homepage extends Component {


    constructor() {

        super();

        //Manipulate the page background
        //Init the bg
        document.getElementsByTagName("body")[0].style.backgroundImage = `url(${background})`;
        document.getElementsByTagName("body")[0].style.backgroundSize = `cover`;
        document.getElementsByTagName("body")[0].style.backgroundRepeat = `no-repeat`;
    }


    render() {
        return (
            <div>
                <Navbar/>
                <CSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={5000}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <h1 className="title display-4" id="title-top">Asezarile rupestre</h1>
                    <h1 className="title display-4" id="title-bot">Bozioru</h1>
                    <h3 className="text">O calatorie in negura istoriei judetului Buzau</h3>
                    <h3 className="text">Ecce, festus palus!Ubi est teres parma?Ecce, ventus!</h3>
                    <h3 className="text">Never taste a bilge rat.Scabbards hobble from passions like misty
                        tobaccos.</h3>
                    <Link to="/harta" className="btn btn-success mt-5">Catre harta! </Link>
                </CSSTransitionGroup>
            </div>

        );
    }
}

export default Homepage;

