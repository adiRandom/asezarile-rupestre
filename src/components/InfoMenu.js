import React from "react";
import "../assets/stylesheets/info-menu.css"

export default class InfoMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = { items: [] }
    }


    componentDidMount = async () => {
        for (let i = 0; i < this.props.items.length; i++) {
            await import(`../assets/icons/${this.props.icons[i]}.png`).then((icon) => {
                let element = (
                    <div className="item" key={i} onClick={(event) => this.props.onClick(this.props.items[i])}>
                        <img alt="icon" className="icon" src={icon}></img>
                        <h3 className="item-name">{this.props.items[i]}</h3>
                    </div>
                );
                let temp = this.state.items;
                temp.push(element);
                this.setState({ items: temp });
            })
        }
    }

    render() {
        return (
            <div id="info-menu-flex-container">
                {this.state.items}
            </div>
        )
    }
}