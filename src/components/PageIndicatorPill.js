import React from 'react';
import * as onState from '../assets/graphics/Page-indicator-on.png'
import * as offState from '../assets/graphics/Page-indicator-off.png'

export default class PageIndicatorPill extends React.Component{


    constructor(props){

        super(props);
        if(this.props.active)
            this.image = onState;
        else
            this.image = offState;

        this.style = {
            backgroundImage:`url(${this.image})`,
            marginRight:'10px', 
            height:"32px", 
            width:"32px" ,
            display:"inline-block"};

    }


    render(){

        return(
            <div style={this.style}></div>
        );

    }


}