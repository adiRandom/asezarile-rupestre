import React from "react"
import Navbar from "./Navbar"
import "../assets/stylesheets/credits.css"

export default class Credits extends React.Component {
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div id="credits">
                    <h1 id="title">Credite</h1>
                    <p>Web development: Adrian Pascu</p>
                    <p>Unity development: Rareș Mocanu</p>
                    <p>Graphic design: Radu Cotorceanu</p>
                </div>
            </div>)
    }
}