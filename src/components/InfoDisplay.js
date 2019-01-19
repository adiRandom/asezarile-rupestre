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
            images: [],
            showAllText: false,
            fullTextDispalyStyle: {
                display: 'none'
            }
        }
        if (props.splitMedia)
            this.createSplitMedia(this.props.splitMedia);

    }

    createSplitMedia = (_splitMedia) => {
        if (!Array.isArray(_splitMedia)) {
            if (!Array.isArray(_splitMedia.media))
                switch (_splitMedia.type) {
                    case "image": this.state = {
                        splitMedia: (<img src={_splitMedia.media} className="split-text-picture"></img>)
                    }; break;

                    case "video":
                        this.state = {
                            splitMedia: (<video src={_splitMedia.media} controls={true} className="split-text-video"></video>)
                        }; break;

                    default: break;
                }
            else {
                let elements = [];
                for (let element of _splitMedia.media) {
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
                if (_splitMedia.type === 'image' && _splitMedia.gallery) {
                    let gallery = (<div id='split-media-gallery'>
                        <Carousel showIndicators={false} autoplay={true} showThumbs={false} >
                            {elements}
                        </Carousel>
                    </div>)
                    this.setState({
                        splitMedia: gallery
                    })
                }
                else
                    this.setState({
                        splitMedia: elements
                    })
            }
        }
        else {
            let splitMediaElements = [];
            for (let splitMedia in _splitMedia) {
                if (!Array.isArray(splitMedia.media))
                    switch (splitMedia.type) {
                        case "image": splitMediaElements.push((<img src={splitMedia.media} className="split-text-picture"></img>))
                            break;

                        case "video": splitMediaElements.push((<video src={splitMedia.media} controls={true} className="split-text-video"></video>))
                            break;
                        default: break;
                    }
                else {
                    let elements = [];
                    for (let element of splitMedia.media) {
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
                    if (splitMedia.type === 'image' && splitMedia.gallery) {
                        let gallery = (<div id='split-media-gallery'>
                            <Carousel showIndicators={false} autoplay={true} showThumbs={false} >
                                {elements}
                            </Carousel>
                        </div>)
                        splitMediaElements.push(gallery)
                    }
                    else
                        splitMediaElements.push(elements);
                }
            }
        }
    }

    mapNewLineToBr = (_text) => {
        //Map \r\n to <br>
        if (!Array.isArray(_text)) {
            this.setState({
                text: _text.split('\r\n').map((item, key) => {
                    return <span key={key}>{item}<br /></span>
                })
            })
        }
        else {
            let result = [];
            for (let text of _text) {
                result.push(text.split('\r\n').map((item, key) => {
                    return <span key={key}>{item}<br /></span>
                }))
            }
            this.setState({
                text: result
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

        this.mapNewLineToBr(this.props.text);
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
                if (nextProps.splitMedia)
                    this.createSplitMedia(nextProps.splitMedia)

                this.mapNewLineToBr(nextProps.text)
                return true;
            });
        }
        return false;
    }

    getButtonMessage = () => {
        return this.state.showAllText ? 'Vezi mai putin' : 'Vezi mai mult'
    }

    toggleFullTextDisplay = () => {
        this.setState((prevState) => ({
            showAllText: !prevState.showAllText,
            fullTextDispalyStyle: {
                display: prevState.fullTextDispalyStyle.display === 'none' ? 'block' : 'none'
            }
        }))
        //Make the page scroll a bit to fix the scrolling bug
    }

    createTextContainerWhenTextSplit = () => {

        let result = [];
        for (let i = 0; i < this.state.text.length; i++) {
            let temp = (
                <div id="info-display-split-text-container" key={i} >
                    <div id="info-display-text-1-wrapper">{this.state.text[i]}</div>
                    <div id='info-dispaly-split-media-container'>
                        {this.state.splitMedia[i]}
                    </div>
                </div>
            )
            result.push(temp);
        }
        return result;
    }

    render() {
        return (
            <div id='info-display-flex-container'>
                <div id='info-display-title-container'>
                    <h1 id='info-display-title'>{this.props.title}</h1>
                </div>
                <div id='info-display-content-container'>
                    {this.props.shortText}
                    <div id='info-display-full-text-container' style={this.state.fullTextDispalyStyle}>
                        {/* Check if the text is supposed to be split in two */}
                        {Array.isArray(this.props.text) && this.createTextContainerWhenTextSplit()}
                        {/* If the text is a string, display it */}
                        {!Array.isArray(this.props.text) && (<div id="info-display-text-wrapper">{this.state.text}</div>)}
                    </div>
                    <div id='read-more-button-wrapper'>
                        <button id='read-more-button' onClick={this.toggleFullTextDisplay}>
                            <span>{this.getButtonMessage()}</span>
                        </button>
                    </div>
                    {this.props.images &&
                        (<Carousel showIndicators={false} autoplay={true} showThumbs={false} >
                            {this.state.images}
                        </Carousel>)
                    }
                </div>
            </div>
        )
    }
}