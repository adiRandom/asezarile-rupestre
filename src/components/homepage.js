/**
 * Created by Adrian on 29-Aug-18.
 */

import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import next from "../assets/icons/next.png";
import {CSSTransitionGroup} from "react-transition-group";
import "../assets/stylesheets/animation.css";
class Homepage extends Component {

    render() {
        return (


            <div className="container">
                <div className="row align-items-end" style={{height: "50vh"}}>
                    <div className="col-12">

                        <CSSTransitionGroup
                            transitionName="title"
                            transitionAppear={true}
                            transitionAppearTimeout={3000}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <h1 className="text-light text-center display-3">Asezarile Rupestre Bozioru</h1>
                        </CSSTransitionGroup>

                    </div>
                </div>
                <div className="row justify-content-end align-items-center" style={{height: "20vh"}}>
                    <div className="col-3">
                        <CSSTransitionGroup
                            transitionName="next"
                            transitionAppear={true}
                            transitionAppearTimeout={3000}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <Link to="/map" className="text-light" style={{textDecoration: 'none'}}><span><img
                                alt="next"
                                src={next}/></span>Catre
                                harta</Link>
                        </CSSTransitionGroup>
                    </div>
                </div>
            </div>

        );
    }
}

export default Homepage;

