import React from "react";
import "../assets/stylesheets/legends.css"

export default class Legends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: [],
            text: "Selecteaza mai intai o legenda",
            style: {
                display: "flex"
            }
        }
    }

    selectLegend = (key) => {
        this.setState({
            text: this.props.legends[key].text,
            display: "block"
        })
    }

    componentDidMount() {
        const menu = this.props.legends.map((item, key) => {
            return <button key={key} onClick={() => this.selectLegend(key)} className="legends-menu-button">{item.title}</button>
        });

        this.setState({
            menuItems: menu
        })
    }

    render() {
        return (
            <div id="legends-main-flex-container">
                <div id="legends-menu-bar">
                    {this.state.menuItems}
                </div>
                <div id='legends-text-zone' style={this.state.style}>
                    {this.state.text}
                </div>
            </div>
        )
    }
}