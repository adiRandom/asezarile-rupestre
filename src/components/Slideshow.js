import React from 'react';

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
                    if (i != 0)
                        temp.push((<div className="carousel-item">
                            <img src={photo} style={{ maxWidth: '35%' }} key={i} />
                        </div>));
                    else //Special case for the first element to add the active class
                        temp.push((<div className="carousel-item active">
                            <img src={photo} style={{ maxWidth: '35%' }} key={i} />
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
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
                <div className="carousel-inner">
                    {this.state.elements}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}