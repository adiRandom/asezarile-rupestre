import React from "react";
import "../assets/stylesheets/info-menu.css"

export default class InfoMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            classes: [],
            currentActive:0
        }
    }

    setActiveItem = (key) => {
        let _classes = this.state.classes;
        _classes[this.state.currentActive] = "item"
        _classes[key] = "item active-item";
        this.setState({
            classes:_classes,
            currentActive:key
        });
    }


    componentDidMount = async () => {
        for (let i = 0; i < this.props.items.length; i++) {
            await import(`../assets/icons/${this.props.icons[i]}.png`).then((icon) => {
                let element = (
                    <div className="item" onClick={() => this.setActiveItem(i)} key={i} onClick={(event) => this.props.onClick(this.props.items[i])}>
                        <img alt="icon" className="icon" src={icon}></img>
                        <h3 className="item-name">{this.props.items[i]}</h3>
                    </div>
                );
                let temp = this.state.items;
                temp.push(element);
                let _classes = this.state.classes;
                _classes.push("item")
                this.setState({
                    items: temp,
                    classes: _classes
                });
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