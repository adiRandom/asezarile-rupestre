import React from 'react'

export class Carousel extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="carrousel">
                <div className="carousel-container">
                    <span className="carousel-image" stle={{"background" : "url("{this.props.currentImage}")"}}>
                    </span>
                    <div classname="carousel-text">
                        <div className="carousel-text-tite">
                            {this.props.currentTitle}
                        </div>
                        <div className="carousel-text-content">
                            {this.props.currentText}
                        </div>
                    </div>
                </div>
            </div>)
        ;
    }


}