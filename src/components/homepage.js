/**
 * Created by Adrian on 29-Aug-18.
 */

import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import background from "../assets/img/back1.png";
import Navbar from "../components/Navbar";
import {CSSTransitionGroup} from "react-transition-group";


import "../assets/stylesheets/main.css";
import "../assets/stylesheets/animation.css";

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
                    <h1 className="title display-4" id="title-top">Așezările rupestre</h1>
                    <h1 className="title display-4" id="title-bot">de la Bozioru</h1>
                    <h3 className="text">O întoarcere în peisajul creștinismului timpuriu,</h3>
                    <h3 className="text">Unde pietrele spun povestea locului</h3>
                    <h3 className="text">De la începutul istoriei și până acum.</h3>
                    <Link to="/harta" className="btn btn-success mt-5">Vezi harta! </Link>
                </CSSTransitionGroup>
            </div>

        );
    }
}

export default Homepage;

