import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../assets/stylesheets/slideshow.css'
import Controll from './Controll'
import FullscreenImage from './FullscreenImage'

export default class Slideshow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            selectedElement: 0,
            fullscreenImage: null
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

    handleWrapparound = (prev, amount) => {
        if (amount > 0)
            if (prev + amount < this.props.images.length)
                return prev + amount;
            else
                return -1 + amount;
        else
            if (prev + amount >= 0)
                return prev + amount;
            else
                return this.props.images.length + amount;
    }

    changeElement = (amount) => {
        this.setState((prev) => ({
            selectedElement: this.handleWrapparound(prev.selectedElement, amount)
        }), () => { console.log(this.state) })
    }

    showImageFullscreen = () => {
        this.props.showImageFullscreen( (<FullscreenImage index={this.state.selectedElement} images={this.props.images}
                onClose={this.closeFullscreenImage} />))
    }

    closeFullscreenImage = () => {
       this.props.closeFullscreenImage();
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Carousel onClickItem={this.showImageFullscreen} selectedItem={this.state.selectedElement} showIndicators={false} infiniteLoop={true} showThumbs={false} showArrows={false}>
                        {this.state.elements}
                    </Carousel>
                    <div style={{ marginTop: '25px' }}>
                        <Controll margin='20px' background='transparent' orientation='left' onClick={this.changeElement}></Controll>
                        <Controll margin='20px' background='transparent' orientation='right' onClick={this.changeElement}></Controll>
                    </div>
                </div>
            </div>
        )
    }
}