import React from 'react'
import PageIndicator from './PageIndicator'
import "../assets/stylesheets/carousel.css";
import * as classNames from "classnames";
import { truncate } from 'fs';

export default class Carousel extends React.Component {


    //Pass in an array of objects constituded by a title,a text and an image
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
            })
        }; //The curent displaying object

        this.scrollHandling = this.scrollHandling.bind(this); //Event to handle the scroll on the carousel
        //and toggle between changing the slides and scrolling on the page

        this.leftThroughTheLeftSide = this.leftThroughTheLeftSide.bind(this);
        this.leftThroughTheRightide = this.leftThroughTheRightSide.bind(this);
        this.leftThroughTheLeftSideWithWrap = this.leftThroughTheLeftSideWithWrap.bind(this);
        this.leftThroughTheRightideWithWrap = this.leftThroughTheRightSideWithWrap.bind(this);
        this.enteringFromTheRight = this.enteringFromTheRight.bind(this);
        this.enteringFromTheLeft = this.enteringFromTheLeft.bind(this);

        this.markAsEntered = this.markAsEntered.bind(this);
    }

    scrollHandling(e) {

        /////////////////
        // A negativ deltaY is an up scroll, positive is down
        /////////////////
        if (e.deltaY > 0) {
            if (this.state.currentIndice != this.props.data.length - 1) { // If true we wrap-around
                e.preventDefault(); //Prevent the page scrolling
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
                },()=> setTimeout( this.leftThroughTheLeftSide,1000));
            }
            else{
                e.preventDefault(); //Prevent the page scrolling
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
                }, () => setTimeout(this.leftThroughTheLeftSideWithWrap, 1000));
            }

        }
        else {
            if (this.state.currentIndice != 0) {  //If true we wrap-around
                e.preventDefault(); //Prevent the page scrolling
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
                }, ()=> setTimeout( this.leftThroughTheRightSide,1000));
            }
            else{
                e.preventDefault(); //Prevent the page scrolling
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
                }, () => setTimeout(this.leftThroughTheRightSideWithWrap, 1000));
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
    }),()=>setTimeout(this.enteringFromTheLeft,300))

    leftThroughTheLeftSide = () =>  this.setState((prev) => ({ //Adter a second we mark that the current data left through the left side
        currentIndice: prev.currentIndice + 1,  //Now that the content is hidden, we can change it
        style: classNames({
            'leaving-left': false,
            'leaving-right': false,
            'left-left': true,
            'left-right': false,
            'entering-left': false,
            'entering-right': false,
            entered: false
        })}),()=> setTimeout(this.enteringFromTheRight,300))

    leftThroughTheRightSideWithWrap =  () =>this.setState((state,props)=>({  //Adter a second we mark that the current data left through the right side
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

    enteringFromTheRight(){

    this.setState({
        style: classNames({
            'leaving-left': false,
            'leaving-right': false,
            'left-left': false,
            'left-right': false,
            'entering-left': false,
            'entering-right': true,
            entered: false
        })})

    }
    enteringFromTheLeft() {

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

    markAsEntered(){
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

    render() {


        return (
            <div className="carrousel" onWheel={this.scrollHandling}>
                <div id="carousel-data" className={this.state.style}>
                    <span className="carousel-image"><img src={this.props.data[this.state.currentIndice].photo}
                        className="w-25 h-25" style={{ display: "inline-block" }} /></span>
                    <div classname="carousel-text" style={{ display: "inline-block" }}>
                        <div className="carousel-text-tite" >
                            {this.props.data[this.state.currentIndice].title}
                        </div>
                        <div className="carousel-text-content" >
                            {this.props.data[this.state.currentIndice].text}
                        </div>
                    </div>
                </div>
                <PageIndicator size={this.props.data.length} activeIndice={this.state.currentIndice} />
            </div>)
            ;
    }


}