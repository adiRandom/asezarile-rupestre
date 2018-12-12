import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../assets/stylesheets/slideshow.css'

export default class Slideshow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: []
        }
    }

    //Load the images from the props
    //And add them to an array in the state
    async componentDidMount() {
        console.log(this.props);
        for (let i = 0; i < this.props.images.length; i++)
            await import(`../assets/img/${this.props.images[i]}`).then((photo) => {
                this.setState((prev) => {
                    let temp = prev.elements;
                    temp.push((<div>
                                <img alt='slide-image' src={photo} style={{ maxWidth: '60%', maxHeight: '60%' }}
                                onClick={(e)=>{console.log(i)}} key={i} />
                            </div>));
                    return {
                        elements: temp
                    }
                }
                )
            })
    }

    render() {
        return (
                <Carousel infiniteLoop={true} showThumbs={false} showArrows={false}>
                    {this.state.elements}
                </Carousel>
        )
    }
}