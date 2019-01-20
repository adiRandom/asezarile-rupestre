import React from 'react';
import "../assets/stylesheets/info-display.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paragraphs: [],
            showAllText: false,
            fullTextDispalyStyle: {
                display: 'none'
            },
            images: []
        }
    }

    mapNewLineToBr = (_text) => {
        //Map \r\n to <br>
        return _text.split('\r\n').map((item, key) => {
            return <span key={key}>{item}<br /></span>
        })
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

    createParagraphs = async () => {
        for (let paragraph of this.props.paragraphs) {
            let snapshot = this.state.paragraphs;
            this.setState({
                auxArray: []
            }, async () => {
                for (let image of paragraph.images) {
                    await import(`../assets/img/${image}`).then((res) => {
                        let _snapshot = this.state.auxArray;
                        _snapshot.push((
                            <div id="info-display-slide">
                                <img className="info-display-image" src={res}></img>
                            </div>
                        ));
                        this.setState({
                            auxArray: _snapshot
                        })
                    })
                }
                snapshot.push({
                    text: this.mapNewLineToBr(paragraph.text),
                    isGallery: paragraph.isGallery,
                    images: this.state.auxArray
                })
                this.setState({
                    paragraphs: snapshot
                })
            })
        }

        //Now create the galleris if steted
        for (let i = 0; i < this.state.paragraphs.length; i++) {
            if (this.state.paragraphs[i].isGallery) {
                let snapshot = this.state.paragraphs.images;
                snapshot[i] = (
                    <Carousel showIndicators={false} autoplay={true} showThumbs={false} >
                        {this.state.paragraphs[i].images}
                    </Carousel>
                );
                this.setState({
                    paragraphs: snapshot
                })
            }
        }
    }

    render() {
        return (
            <div id='info-display-flex-container'>
                <div id='info-display-title-container'>
                    <h1 id='info-display-title'>{this.props.title}</h1>
                </div>
                <div id='info-display-content-container'>
                    <div id="info-display-short-text-wrapper">
                        {this.props.shortText}
                    </div>
                    <div id='info-display-full-text-container' style={this.state.fullTextDispalyStyle}>
                        {this.createParagraphs()}
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