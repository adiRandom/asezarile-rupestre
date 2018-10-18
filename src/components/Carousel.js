import React from 'react'
import PageIndicator from './PageIndicator'
import "../assets/stylesheets/carousel.css";
import * as classNames from "classnames";

import * as slideBackground from '../assets/img/slidegreen.png'
import Arrow from './Arrow.js';


export default class Carousel extends React.Component {


    //Pass in an array of objects containing a title, a text, an image and optionally another object to style the image
    constructor(props) {
        super(props);



        this.state = {
            currentIndice: 0,
            style: classNames({
                'leaving-left': false,
                'leaving-right': false,
                'left-left': false,
                'left-right': false,
                'entering-left': false,
                'entering-right': false,
                entered: true
            }),
            slideBackgroundStyle: {
                backgroundImage: `url(${slideBackground})`,
                backgroundSize:'cover',
            }
        }; //Set the initial state of the component

        this.changeSlide = this.changeSlide.bind(this); //Event to handle the scroll on the carousel
        //and toggle between changing the slides and scrolling on the page

        this.leftThroughTheLeftSide = this.leftThroughTheLeftSide.bind(this);
        this.leftThroughTheRightide = this.leftThroughTheRightSide.bind(this);
        this.leftThroughTheLeftSideWithWrap = this.leftThroughTheLeftSideWithWrap.bind(this);
        this.leftThroughTheRightideWithWrap = this.leftThroughTheRightSideWithWrap.bind(this);
        this.enteringFromTheRight = this.enteringFromTheRight.bind(this);
        this.enteringFromTheLeft = this.enteringFromTheLeft.bind(this);

        this.markAsEntered = this.markAsEntered.bind(this);

        console.log(this.props.changeFullText);


    }


    changeSlide(e) {

        
        if (e.orientation === 'right') {
            if (this.state.currentIndice != this.props.data.length - 1) { // If true we wrap-around
                this.setState({
                    style: classNames({   //Making that the current data should left through the left side
                        'leaving-left': true,
                        'leaving-right': false,
                        'left-left': false,
                        'left-right': false,
                        'entering-left': false,
                        'entering-right': false,
                        entered: false
                    })
                }, () => setTimeout(this.leftThroughTheLeftSide, 500));
            }
            else {
                this.setState({
                    style: classNames({   //Making that the current data should left through the left side
                        'leaving-left': true,
                        'leaving-right': false,
                        'left-left': false,
                        'left-right': false,
                        'entering-left': false,
                        'entering-right': false,
                        entered: false
                    })
                }, () => setTimeout(this.leftThroughTheLeftSideWithWrap, 500));
            }

        }
        else {
            if (this.state.currentIndice != 0) {  //If true we wrap-around
                this.setState({
                    style: classNames({   //Making that the current data should left through the right side
                        'leaving-left': false,
                        'leaving-right': true,
                        'left-left': false,
                        'left-right': false,
                        'entering-left': false,
                        'entering-right': false,
                        entered: false
                    })
                }, () => setTimeout(this.leftThroughTheRightSide, 500));
            }
            else {
                this.setState({
                    style: classNames({   //Making that the current data should left through the right side
                        'leaving-left': false,
                        'leaving-right': true,
                        'left-left': false,
                        'left-right': false,
                        'entering-left': false,
                        'entering-right': false,
                        entered: false
                    })
                }, () => setTimeout(this.leftThroughTheRightSideWithWrap, 500));
            }
        }

    }

    leftThroughTheRightSide = () => this.setState((prev) => ({  //Adter a second we mark that the current data left through the right side
        currentIndice: prev.currentIndice - 1, //Now that the content is hidden we can change it
        style: classNames({
            'leaving-left': false,
            'leaving-right': false,
            'left-left': false,
            'left-right': true,
            'entering-left': false,
            'entering-right': false,
            entered: false
        })
    }), () => setTimeout(this.enteringFromTheLeft, 300))

    leftThroughTheLeftSide = () => this.setState((prev) => ({ //Adter a second we mark that the current data left through the left side
        currentIndice: prev.currentIndice + 1,  //Now that the content is hidden, we can change it
        style: classNames({
            'leaving-left': false,
            'leaving-right': false,
            'left-left': true,
            'left-right': false,
            'entering-left': false,
            'entering-right': false,
            entered: false
        })
    }), () => setTimeout(this.enteringFromTheRight, 300))

    leftThroughTheRightSideWithWrap = () => this.setState((state, props) => ({  //Adter a second we mark that the current data left through the right side
        currentIndice: props.data.length - 1, //Now that the content is hidden we can change it
        style: classNames({
            'leaving-left': false,
            'leaving-right': false,
            'left-left': false,
            'left-right': true,
            'entering-left': false,
            'entering-right': false,
            entered: false
        })
    }), () => setTimeout(this.enteringFromTheLeft, 300))

    leftThroughTheLeftSideWithWrap = () => this.setState({ //Adter a second we mark that the current data left through the left side
        currentIndice: 0,  //Now that the content is hidden, we can change it
        style: classNames({
            'leaving-left': false,
            'leaving-right': false,
            'left-left': true,
            'left-right': false,
            'entering-left': false,
            'entering-right': false,
            entered: false
        })
    }, () => setTimeout(this.enteringFromTheRight, 300))

    enteringFromTheRight() { //Mark that the next piece of content should enter from the right side

        this.setState({
            style: classNames({
                'leaving-left': false,
                'leaving-right': false,
                'left-left': false,
                'left-right': false,
                'entering-left': false,
                'entering-right': true,
                entered: false
            })
        })

    }
    enteringFromTheLeft() { //Mark that the next piece of content should enter from the left side

        this.setState({
            style: classNames({
                'leaving-left': false,
                'leaving-right': false,
                'left-left': false,
                'left-right': false,
                'entering-left': true,
                'entering-right': false,
                entered: false
            })
        })

    }

    markAsEntered() {  //Mark that the next piece of content entered
        this.setState({
            style: classNames({
                'leaving-left': false,
                'leaving-right': false,
                'left-left': false,
                'left-right': false,
                'entering-left': false,
                'entering-right': false,
                entered: true
            })
        })
    }
    
    readMore = ()=>{
        this.props.changeFullText(this.state.currentIndice);
    }

    render() {


        return (
            <div className="carrousel" style={this.props.style}>
                <div className="grid-container">
                    <PageIndicator size={this.props.data.length} activeIndice={this.state.currentIndice} 
                        style={{gridColumnStart:'second',justifySelf:'center',marginTop:'30px'}}
                    />
                </div>
                <div id="carousel-data"  style={this.state.slideBackgroundStyle} className={this.state.style}>
                    <Arrow style={{ gridColumnStart: '1', gridRow: '3/4', justifySelf: 'center', alignSelf: 'center' }}
                        orientation='left' onClick={this.changeSlide} />
                    <div className="carousel-image"  style={{gridColumnStart:'2/3',gridRow:'2/4' ,justifySelf:'center', alignSelf:'center'}}>
                        <img src={this.props.data[this.state.currentIndice].picture}
                            style={this.props.data[this.state.currentIndice].style ? 
                                { ...this.props.data[this.state.currentIndice].style, display: "inline-block", maxWidth: '95%'} : { display: "inline-block", maxWidth: '95%'}} />
                    </div>
                    <div id='empty-block-top'></div>
                    <div className="carousel-text-content" >
                        <h1>
                            {this.props.data[this.state.currentIndice].title}
                        </h1>
                            {this.props.data[this.state.currentIndice].textChopped}
                            <h3 onClick = {this.readMore} id="read-more">Citeste mai mult</h3>
                        </div>
                    <Arrow style={{ gridColumnStart: '4', gridRow: '3/4', justifySelf: 'center', alignSelf: 'center' }}
                        orientation='right' onClick={this.changeSlide} />
                    <div id='empty-block-bottom'></div>
                    </div>
            </div>)
            ;
    }


}