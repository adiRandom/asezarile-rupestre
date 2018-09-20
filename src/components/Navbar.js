import React from "react";
import * as Logo from "../assets/icons/logo.png";
import {Link} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min";
import * as classNames from "classnames";
import "../assets/stylesheets/navbar.css";

export default class Homepage extends React.Component {


    constructor(props) {

        super(props);

        this.toVirtualTour = this.toVirtualTour.bind(this);

        //Keep track of the current active link
        //Can be changed with ActiveLink from react

        this.classes = {

            harta: classNames({

                "nav-link": true,
                "active": this.props.active === "Harta"
            }),
            turVirtual: classNames({

                "nav-link": true,
                "active": this.props.active === "Tur Virtual"
            }),
            istorie: classNames({

                "dropdown-item": true,
                "active": this.props.active === "Istorie"
            }),
            geografie: classNames({

                "dropdown-item": true,
                "active": this.props.active === "Geografie"
            }),
            religie: classNames({

                "dropdown-item": true,
                "active": this.props.active === "Religie"
            }),
            arheologie: classNames({

                "dropdown-item": true,
                "active": this.props.active === "Arheologie"
            }),
            turism: classNames({

                "dropdown-item": true,
                "active": this.props.active === "Turism"
            }),
            legendeSiSuperstitii: classNames({

                "dropdown-item": true,
                "active": this.props.active === "Legende si superstitie"
            }),
            bibliografie: classNames({

                "dropdown-item": true,
                "active": this.props.active === "Bibliografie"
            })

        };

    }

    toVirtualTour() {

        let window = window.open('/tur', 'Tur virtual');
        window.focus();


    }

    render() {


        return (
            <nav className="navbar navbar-expand-lg navbar-light" style={{"background-color": "white"}}>
                <Link className="navbar-brand" to="/"><img src={Logo} alt={"Logoul acestui site"}
                                                           style={{width: "70px", height: "47px"}} className="mb-3"/>
                    <span className="ml-2" style={{
                        "font-weight": "bold",
                        "font-family": "Bernard MT Condensed",
                        "font-size": "34px"
                    }}>Bozioru</span>
                </Link>

                <div className="ml-auto">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className={this.classes.harta} to="/harta">Hartă</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={this.classes.turVirtual} to="/tur" onClick={this.toVirtualTour}>Tur
                                virtual</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Informații
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {/* TODO: Add the links after creating the pages*/}
                                <Link className={this.classes.istorie} to="#">Istorie</Link>
                                <Link className={this.classes.geografie} to="#">Geografie</Link>
                                <Link className={this.classes.religie} to="#">Religie</Link>
                                <Link className={this.classes.arheologie} to="#">Arheologie</Link>
                                <Link className={this.classes.turism} to="#">Turism</Link>
                                <Link className={this.classes.legendeSiSuperstitii} to="#">Legende&superstiții</Link>
                                <Link className={this.classes.bibliografie} to="#">Bibliografie</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/evaluare">Evaluare</Link>
                        </li>
                    </ul>
                </div>
            </nav>

        );


    }

}