import React from 'react'
import * as leftArrow from "../assets/graphics/larrow_inactive.png"
import * as rightArrow from "../assets/graphics/rarrow_inactive.png"

export default class Controll extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:props.orientation + "-button",
            icon: props.orientation === 'left' ? leftArrow : rightArrow,
            alt: props.orientation + "-arrow"
        }
    }
    clickHandler = ()=>{this.props.onClick(this.props.orientation === 'left' ? -1 : 1)}
    render(){
        return(
            <button style={{
                backgroundColor: 'white', margin: this.props.margin, background: this.props.background,
                clipPath: 'polygon(0% 0 %, 75 % 0 %, 100 % 50 %, 75 % 100 %, 0 % 100 %)',
                border:'none' }} id={this.state.id} onClick={this.clickHandler}>
                <img src={this.state.icon} alt={this.state.alt} />
            </button>
        )
    }
}