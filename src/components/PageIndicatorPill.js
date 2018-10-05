import React from 'react';
import * as onState from '../assets/graphics/Page-indicator-on.png'
import * as offState from '../assets/graphics/Page-indicator-off.png'

export default class PageIndicatorPill extends React.Component{


    constructor(props){

        super(props);
        this.style = {
            backgroundImage: `url(${props.active ? onState : offState})`,
            marginRight: '10px',
            height: "32px",
            width: "32px",
            display: "inline-block"
        };
    }

    componentWillReceiveProps(nextProps){
        this.style = {
            backgroundImage: `url(${nextProps.active?onState:offState})`,
            marginRight: '10px',
            height: "32px",
            width: "32px",
            display: "inline-block"
        };
    }

    render(){

        return(
            <div style={this.style}></div>
        );

    }


}