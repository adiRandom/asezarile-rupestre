import React from "react";
import { NavLink } from 'react-router-dom';
import * as logo from '../assets/icons/logo.png';
import "../assets/stylesheets/navbar.css";

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    goToTour = ()=>{
        window.location.replace("/tur");
    }


    render() {
        return (
            <div id="navbar-container" style={
                {
                    backgroundColor: this.props.color
                }
            }>
                <div id="logo-container">
                    <img id="logo" alt="logo" src={logo}></img>
                    <h4 id="name">Bozioru</h4>
                </div>
                <ul id="links">
                    <li><NavLink exact={true} to="/" activeClassName="selected-link">
                        <span className="link-wrapper">Acasă</span></NavLink></li>
                    <li><NavLink exact={true} to="/harta" activeClassName="selected-link">
                        <span className="link-wrapper">Hartă</span></NavLink></li>
                    <li><NavLink exact={true} to="/tur" activeClassName="selected-link">
                        <span className="link-wrapper" onClick={this.goToTour}>Tur virtual</span></NavLink></li>
                </ul>
            </div>
        )
    }
}