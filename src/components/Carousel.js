import React from 'react'
import PageIndicator from './PageIndicator'
import "../assets/stylesheets/carousel.css";
import * as classNames from "classnames";
import { CSSTransitionGroup } from "react-transition-group";
import * as bookIcon from '../assets/icons/book-icon.png';

import Arrow from './Arrow.js';
import Slideshow from './Slideshow'


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
                backgroundColor: this.props.color,
                backgroundSize: 'cover'
            },
            imageElement: null,
            logo:null
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

    }

    componentWillMount() {
        //Declare the image node and add it to the state in order to unmount it 
        //and remount it to reset the animation

        //Import the apropiae imagees

        if (this.props.data[this.state.currentIndice].pictures){  //Check if there are more pictures for the slideshow
            this.imageElement = (
                <div className="carousel-image" style={{ gridColumnStart: '2/3', gridRow: '2/4', justifySelf: 'center', alignSelf: 'center', textAlign:'center' }}>
                        <Slideshow images={this.props.data[this.state.currentIndice].pictures}
                            style={this.props.data[this.state.currentIndice].style ?
                                { ...this.props.data[this.state.currentIndice].style, display: "inline-block", maxWidth: '95%', transitionDelay: '1000ms' } : { display: "inline-block", maxWidth: '95%', transitionDelay: '1000ms' }} />
                </div>
            );
            this.setState((prev) => ({
                imageElement: this.imageElement,
                readMore: this.props.data[prev.currentIndice].textFull ? (<h3 onClick={this.readMore} id="read-more">
                    <img alt='read-more-icon' src={bookIcon} style={{ maxHeight: '32px', maxWidth: '32px', margin: '10px' }} />Citeste mai mult</h3>) : null //Check if the first slide should have the 'read more' button
            }))
        }
        else //There is only a picture, so don't use the slideshow
            import(`../assets/img/${this.props.data[this.state.currentIndice].picture}`).then((image) => {
                this.imageElement = (
                    <div className="carousel-image" style={{ gridColumnStart: '2/3', gridRow: '2/4', justifySelf: 'center', alignSelf: 'center' }}>
                        <CSSTransitionGroup
                            transitionName="image-enter"
                            transitionAppear={true}
                            transitionAppearTimeout={5000}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <img src={image}
                                style={this.props.data[this.state.currentIndice].style ?
                                    { ...this.props.data[this.state.currentIndice].style, display: "inline-block", maxWidth: '95%', transitionDelay: '1000ms' } : { display: "inline-block", maxWidth: '95%', transitionDelay: '1000ms' }} />
                        </CSSTransitionGroup>
                    </div>
                );
            this.setState((prev) => ({
                imageElement: this.imageElement,
                readMore: this.props.data[prev.currentIndice].textFull ? (<h3 onClick={this.readMore} id="read-more">
                        <img src={bookIcon} style={{maxHeight:'32px',maxWidth:'32px',margin:'10px'}}/>Citeste mai mult</h3>) : null //Check if the first slide should have the 'read more' button
            }))
        })
    }


    changeSlide(e) {

        console.log(e);
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
        }),
        imageElement: (<p>Hello</p>),//The node is invisible so 'unmount' it
        readMore: this.props.data[prev.currentIndice - 1].textFull ? (<h3 onClick={this.readMore} id="read-more">
            <img src={bookIcon} style={{ maxHeight: '32px', maxWidth: '32px', margin: '10px' }} />Citeste mai mult</h3>) : null //The data changed so we check whether or not we should have the read more button
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
        }),
        imageElement: (<p>Hello</p>), //The node is invisible so 'unmount' it
        readMore: this.props.data[prev.currentIndice + 1].textFull ? (<h3 onClick={this.readMore} id="read-more">
            <img src={bookIcon} style={{ maxHeight: '32px', maxWidth: '32px', margin: '10px' }} />Citeste mai mult</h3>) : null //The data changed so we check whether or not we should have the read more button
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
        }),
        imageElement: (<p>Hello</p>) //The node is invisible so 'unmount' it
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
        }),
        imageElement: (<p>Hello</p>) //The node is invisible so 'unmount' it
    }, () => setTimeout(this.enteringFromTheRight, 300))

    enteringFromTheRight() { //Mark that the next piece of content should enter from the right side

        //Update the image that is being displayed

        if (this.props.data[this.state.currentIndice].pictures) {  //Check if there are more pictures for the slideshow
            this.imageElement = (
                <div className="carousel-image" style={{ gridColumnStart: '2/3', gridRow: '2/4', justifySelf: 'center', alignSelf: 'center', textAlign: 'center' }}>                        <Slideshow images={this.props.data[this.state.currentIndice].pictures}
                            style={this.props.data[this.state.currentIndice].style ?
                                { ...this.props.data[this.state.currentIndice].style, display: "inline-block", maxWidth: '95%', transitionDelay: '1000ms' } : { display: "inline-block", maxWidth: '95%', transitionDelay: '1000ms' }} />
                </div>
            );
            //Update the state
            this.setState({
                style: classNames({
                    'leaving-left': false,
                    'leaving-right': false,
                    'left-left': false,
                    'left-right': false,
                    'entering-left': false,
                    'entering-right': true,
                    entered: false
                }),
                imageElement: this.imageElement //The node is visible so 'mount' it
            })
        }
        else //There is only a picture, so don't use the slideshow
            import(`../assets/img/${this.props.data[this.state.currentIndice].picture}`).then((image) => {
                this.imageElement = (
                    <div className="carousel-image" style={{ gridColumnStart: '2/3', gridRow: '2/4', justifySelf: 'center', alignSelf: 'center' }}>
                        <CSSTransitionGroup
                            transitionName="image-enter"
                            transitionAppear={true}
                            transitionAppearTimeout={5000}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <img src={image}
                                style={this.props.data[this.state.currentIndice].style ?
                                    { ...this.props.data[this.state.currentIndice].style, display: "inline-block", maxWidth: '95%', transitionDelay: '1000ms' } : { display: "inline-block", maxWidth: '95%', transitionDelay: '1000ms' }} />
                        </CSSTransitionGroup>
                    </div>
                );
                //Update the state
                this.setState({
                    style: classNames({
                        'leaving-left': false,
                        'leaving-right': false,
                        'left-left': false,
                        'left-right': false,
                        'entering-left': false,
                        'entering-right': true,
                        entered: false
                    }),
                    imageElement: this.imageElement //The node is visible so 'mount' it
                })
            })
    }
    enteringFromTheLeft() { //Mark that the next piece of content should enter from the left side

        if (this.props.data[this.state.currentIndice].pictures) {  //Check if there are more pictures for the slideshow
            this.imageElement = (
                <div className="carousel-image" style={{ gridColumnStart: '2/3', gridRow: '2/4', justifySelf: 'center', alignSelf: 'center', textAlign: 'center' }}>
                        <Slideshow images={this.props.data[this.state.currentIndice].pictures}
                            style={this.props.data[this.state.currentIndice].style ?
                                { ...this.props.data[this.state.currentIndice].style, display: "inline-block", maxWidth: '95%', transitionDelay: '1000ms' } : { display: "inline-block", maxWidth: '95%', transitionDelay: '1000ms' }} />
                </div>
            );
            //Update the state
            this.setState({
                style: classNames({
                    'leaving-left': false,
                    'leaving-right': false,
                    'left-left': false,
                    'left-right': false,
                    'entering-left': false,
                    'entering-right': true,
                    entered: false
                }),
                imageElement: this.imageElement //The node is visible so 'mount' it
            })
        }
        else //There is only a picture, so don't use the slideshow
            import(`../assets/img/${this.props.data[this.state.currentIndice].picture}`).then((image) => {
                this.imageElement = (
                    <div className="carousel-image" style={{ gridColumnStart: '2/3', gridRow: '2/4', justifySelf: 'center', alignSelf: 'center' }}>
                        <CSSTransitionGroup
                            transitionName="image-enter"
                            transitionAppear={true}
                            transitionAppearTimeout={5000}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <img src={image}
                                style={this.props.data[this.state.currentIndice].style ?
                                    { ...this.props.data[this.state.currentIndice].style, display: "inline-block", maxWidth: '95%', transitionDelay: '1000ms' } : { display: "inline-block", maxWidth: '95%', transitionDelay: '1000ms' }} />
                        </CSSTransitionGroup>
                    </div>
                );
                //Update the state
                this.setState({
                    style: classNames({
                        'leaving-left': false,
                        'leaving-right': false,
                        'left-left': false,
                        'left-right': false,
                        'entering-left': false,
                        'entering-right': true,
                        entered: false
                    }),
                    imageElement: this.imageElement //The node is visible so 'mount' it
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

    //Call the function to display the  FullTextDisplay node
    readMore = () => {
        this.props.showFullText(this.state.currentIndice);
    }

    render() {

        console.log(this.props)
        return (
            <div className="carrousel" style={this.props.style}>
                <div className="grid-container">
                    <PageIndicator size={this.props.data.length} activeIndice={this.state.currentIndice}
                        style={{ gridColumn: '2/3', justifySelf: 'center', marginTop: '30px' }}
                    />
                    <img src={this.props.logo} style={{
                        width: '64px',
                        display: 'inline-block', margin: '20px'
                    }} />
                </div>
                <div id="carousel-data" style={this.state.slideBackgroundStyle} className={this.state.style}>
                    <Arrow style={{ gridColumnStart: '1', gridRow: '3/4', justifySelf: 'center', alignSelf: 'center' }}
                        orientation='left' onClick={this.changeSlide} />
                    {this.state.imageElement}
                    <div id='empty-block-top'></div>
                    <div className="carousel-text-content" style={{fontFamili:'Calibri'}}>
                        <h1 style={{fontFamily:'Century Gothic', fontStyle:'bold'}}>
                            {this.props.data[this.state.currentIndice].title}
                        </h1>
                        {this.props.data[this.state.currentIndice].textChopped}
                        {this.state.readMore}
                    </div>
                    <Arrow style={{ gridColumnStart: '4', gridRow: '3/4', justifySelf: 'center', alignSelf: 'center' }}
                        orientation='right' onClick={this.changeSlide} />
                    <div id='empty-block-bottom'></div>
                </div>
            </div>)
            ;
    }


}