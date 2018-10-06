import React from 'react';
import * as lArrowActive from '../assets/graphics/larrow_active.png';
import * as rArrowActive from '../assets/graphics/rarrow_active.png';
import * as lArrowInactive from '../assets/graphics/larrow_inactive.png';
import * as rArrowInactive from '../assets/graphics/rarrow_inactive.png';

export default class Arrow extends React.Component{
    constructor(props){
        super(props);
        this.arrow = props.orientation === 'left'?lArrowInactive:rArrowInactive;
        this.state={
            ...props.style,
            width:'23px',
            height:'38px',
            display:'inline-block',
            backgroundImage:`url(${this.arrow})`
        }
    }

    mouseEnterEventHandling = ()=> this.setState({
        ...this.props.style,
        width: '23px',
        height: '38px',
        display: 'inline-block',
        backgroundImage: `url(${this.props.orientation === 'left' ? lArrowActive : rArrowActive})`
    })

    mouseLeaveEventHandling = () => this.setState({
        ...this.props.style,
        width: '23px',
        height: '38px',
        display: 'inline-block',
        backgroundImage: `url(${this.props.orientation === 'left' ? lArrowInactive : rArrowInactive})`
    })

    clickHandler = ()=> this.props.onClick({orientation:this.props.orientation})

    render(){
        return(
            <div style={this.state} onClick={this.clickHandler} onMouseEnter={this.mouseEnterEventHandling} onMouseLeave={this.mouseLeaveEventHandling}></div>
        )
    }
}