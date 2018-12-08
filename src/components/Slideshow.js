import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../assets/stylesheets/slideshow.css'
import Controll from './Controll'

export default class Slideshow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            selectedElement: 0
        }
    }

    //Load the images from the props
    //And add them to an array in the state
    async componentWillMount() {
        for (let i = 0; i < this.props.images.length; i++)
            await import(`../assets/img/${this.props.images[i]}`).then((photo) => {
                this.setState((prev) => {
                    let temp = prev.elements;
                    temp.push((<div>
                        <img alt='slide-image' src={photo} style={{ maxWidth: '60%', maxHeight: '60%' }} key={i} />
                    </div>));
                    return {
                        elements: temp
                    }
                }
                )
            })
    }

    handleWrapparound =(prev,amount) =>{
        if(amount > 0)
            if (prev + amount < this.props.images.length)
                return prev + amount;
            else
                return -1 + amount;
        else
            if(prev + amount >= 0)
                return prev + amount;
            else
                return this.props.images.length + amount;
    }

    changeElement = (amount) => {
        this.setState((prev) => ({
            selectedElement: this.handleWrapparound(prev.selectedElement,amount)
        }),()=>{console.log(this.state)})
    }

    render() {
        return (
            <div style={{display:'flex',flexDirection:'column'}}>
                <Carousel selectedItem={this.state.selectedElement} showIndicators={false} infiniteLoop={true} showThumbs={false} showArrows={false}>
                    {this.state.elements}
                </Carousel>
                <div style={{marginTop:'25px'}}>
                    <Controll orientation='left' onClick={this.changeElement}></Controll>
                    <Controll orientation='right' onClick={this.changeElement}></Controll>
                </div>
            </div>
        )
    }
}