import React from 'react'

export default class Carousel extends React.Component{


    //Pass in an array of objects constituded by a title,a text and an image
    constructor(props){
        super(props);

        this.state={currentIndice : 0}; //The curent displaying object

        this.scrollHandling = this.scrollHandling.bind(this);
    }

    scrollHandling(e){

        console.log(e);

    }

    render(){
        return (
            <div className="carrousel" onScroll={this.scrollHandling}>
                <div className="carousel-container">
                    <span className="carousel-image"><img src={this.props.data[this.state.currentIndice].currentPhoto}/></span>
                    <div classname="carousel-text">
                        <div className="carousel-text-tite">
                            {this.props.data[this.state.currentIndice].currentTitle}
                        </div>
                        <div className="carousel-text-content">
                            {this.props.data[this.state.currentIndice].currentText}
                        </div>
                    </div>
                </div>
            </div>)
        ;
    }


}