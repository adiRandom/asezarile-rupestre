import React from 'react';
import * as onState from '../assets/graphics/marker_active.png'
import * as offState from '../assets/graphics/marker_inactive.png'

export default class PageIndicatorPill extends React.Component {


    constructor(props) {

        super(props);
        this.style = {
            backgroundImage: `url(${props.active ? onState : offState})`,
            marginRight: '10px',
            height: "18px",
            width: "51px",
            display: "inline-block"
        };
    }

    componentWillReceiveProps(nextProps) {
        this.style = {
            backgroundImage: `url(${nextProps.active ? onState : offState})`,
            marginRight: '10px',
            height: "18px",
            width: "51px",
            display: "inline-block"
        };
    }

    render() {

        return (
            <div style={this.style}></div>
        );

    }


}