import React from "react";
import * as Logo from "../assets/icons/logo.png";
import {NavLink,Link} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min";
import * as classNames from "classnames";
import "../assets/stylesheets/navbar.css";

export default class Homepage extends React.Component {


    constructor(props) {

        super(props);

        this.toVirtualTour = this.toVirtualTour.bind(this);
    }

    toVirtualTour() {

        let window = window.open('/tur', 'Tur virtual');
        window.focus();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-light" style={{"background-color": "white"}}>
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
                            <NavLink activeClassName="active" className={'nav-link'} to="/harta">Hartă</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className={'nav-link'} to="/tur" onClick={this.toVirtualTour}>Tur
                                virtual</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Informații
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {/* TODO: Add the links after creating the pages*/}
                                <NavLink activeClassName="active" className={'dropdown-item'} to="/info/istorie">Istorie</NavLink>
                                <NavLink activeClassName="active" className={'dropdown-item'} to="/info/geografie">Geografie</NavLink>
                                <NavLink activeClassName="active" className={'dropdown-item'} to="/info/religie">Religie</NavLink>
                                <NavLink activeClassName="active" className={'dropdown-item'} to="#">Arheologie</NavLink>
                                <NavLink activeClassName="active" className={'dropdown-item'} to="/info/turism">Turism</NavLink>
                                <NavLink activeClassName="active" className={'dropdown-item'} to="/info/legende">Legende&superstiții</NavLink>
                                <NavLink activeClassName="active" className={'dropdown-item'} to="#">Bibliografie</NavLink>
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