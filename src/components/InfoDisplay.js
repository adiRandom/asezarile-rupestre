import React from 'react'
import "../assets/stylesheets/info-display.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

//The structure of the json: title,text,images,splitMedia
//SplitMedia has to specifie the type of media "image" "video"
//The text prop can either be an array for two halves of the text or a string

export default class InfoDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            splitMedia: null,
            images: []
        }
        if (props.splitMedia)
            if (!Array.isArray(props.splitMedia))
                switch (props.splitMedia.type) {
                    case "image": this.state = {
                        splitMedia: (<img src={props.splitMedia.media} className="split-text-picture"></img>)
                    }; break;

                    case "video":
                        this.state = {
                            splitMedia: (<video src={props.splitMedia.media} controls={true} className="split-text-video"></video>)
                        }; break;

                    default: break;
                }
            else {
                let elements = [];
                for (let element of props.splitMedia) {
                    switch (element.type) {
                        case "image":
                            elements.push((<img src={element.media} className="split-text-picture"></img>)
                            ); break;

                        case "video":
                            elements.push((<video src={element.media} controls={true} className="split-text-video"></video>)
                            ); break;

                        default: break;
                    }
                }
                this.setState({
                    splitMedia: elements
                })
            }
    }

    async componentDidMount() {
        if (this.props.images) {
            for (let i = 0; i < this.props.images.length; i++) {
                await import(`../assets/img/${this.props.images[i]}`).then((image) => {
                    let temp = this.state.images;
                    temp.push((
                        <div id="info-display-slide" key={i}>
                            <img className="info-display-image" src={image}></img>
                        </div>
                    ));
                    this.setState({
                        images: temp
                    })
                })
            }
        }
    }

    async shouldComponentUpdate(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                images: [],
                splitMedia: null
            }, async () => {
                if (this.props.images) {
                    for (let i = 0; i < this.props.images.length; i++) {
                        await import(`../assets/img/${this.props.images[i]}`).then((image) => {
                            let temp = this.state.images;
                            temp.push((
                                <div id="info-display-slide" key={i}>
                                    <img className="info-display-image" src={image}></img>
                                </div>
                            ));
                            this.setState({
                                images: temp
                            })
                        })
                    }
                }
                if (this.props.splitMedia)
                    if (!Array.isArray(this.props.splitMedia))
                        switch (this.props.splitMedia.type) {
                            case "image": this.state = {
                                splitMedia: (<img src={this.props.splitMedia.media} className="split-text-picture"></img>)
                            }; break;

                            case "video":
                                this.state = {
                                    splitMedia: (<video src={this.props.splitMedia.media} controls={true} className="split-text-video"></video>)
                                }; break;

                            default: break;
                        }
                    else {
                        let elements = [];
                        for (let element of this.props.splitMedia) {
                            switch (element.type) {
                                case "image":
                                    elements.push((<img src={element.media} className="split-text-picture"></img>)
                                    ); break;

                                case "video":
                                    elements.push((<video src={element.media} controls={true} className="split-text-video"></video>)
                                    ); break;

                                default: break;
                            }
                        }
                        this.setState({
                            splitMedia: elements
                        })
                    }
                return true;
            });
        }
        return false;
    }

    render() {
        return (
            <div id='info-display-flex-container'>
                <div id='info-display-title-container'>
                    <h1 id='info-display-title'>{this.props.title}</h1>
                </div>
                <div id='info-display-content-container'>
                    {/* Check if the text is supposed to be split in two */}
                    {Array.isArray(this.props.text) && (<div id="info-display-text-1-wrapper">{this.props.text[0]}</div>)}
                    {/* Display the split media if there is any */}
                    {this.props.splitMedia && (<div id='info-dispaly-split-media-container'>
                        {this.state.splitMedia}
                    </div>)}
                    {Array.isArray(this.props.text) && (<div id="info-display-text-2-wrapper">{this.props.text[1]}</div>)}
                    {/* If the text is a string, display it */}
                    {!Array.isArray(this.props.text) && (<div id="info-display-text-wrapper">{this.props.text}</div>)}
                    {this.props.images &&
                        (<Carousel showIndicators={false} autopla={true} showThumbs={false} >
                            {this.state.images}
                        </Carousel>)
                    }
                </div>
            </div>
        )
    }
}