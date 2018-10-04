import React from 'react'
import PageIndicator from './PageIndicator'

export default class Carousel extends React.Component{


    //Pass in an array of objects constituded by a title,a text and an image
    constructor(props){
        super(props);

        this.state={currentIndice : 0}; //The curent displaying object

        this.scrollHandling = this.scrollHandling.bind(this); //Event to handle the scroll on the carousel
                                                            //and toggle between changing the slides and scrolling on the page

    }


    scrollHandling(e){

        /////////////////
        // A negativ deltaY is an up scroll, positive is down
        /////////////////
        if(e.deltaY > 0){
            if(this.state.currentIndice != this.props.data.length - 1){  //If true we scroll and we change the slide otherwise
                e.preventDefault(); //Prevent the page scrolling
                this.setState((prev)=>({currentIndice:prev.currentIndice + 1}));
            }
        }
        else{
            if (this.state.currentIndice != 0) {  //If true we scroll and we change the slide otherwise
                e.preventDefault(); //Prevent the page scrolling
                this.setState((prev)=>( { currentIndice: prev.currentIndice - 1 }));
            }
        }

    }

    render(){
 

        return (
            <div className="carrousel" onWheel={this.scrollHandling}>
                <div className="carousel-container">
                    <span className="carousel-image"><img src={this.props.data[this.state.currentIndice].photo} 
                                                        className="w-25 h-25" style={{display:"inline-block"}}/></span>
                    <div classname="carousel-text" style={{display:"inline-block"}}>
                        <div className="carousel-text-tite" >
                            {this.props.data[this.state.currentIndice].title}
                        </div>
                        <div className="carousel-text-content" >
                            {this.props.data[this.state.currentIndice].text}
                        </div>
                    </div>
                    <PageIndicator size={this.props.data.length} activeIndice={this.state.currentIndice}/>
                </div>
            </div>)
        ;
    }


}