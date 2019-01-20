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

        this.count = 0;
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

        await this.createParagraphs();
    }

    createParagraphs = async () => {
        for (let i = 0; i < this.props.paragraphs.length; i++) {
            let snapshot = this.state.paragraphs;
            this.setState({
                auxArray: []
            }, async () => {
                for (let image of this.props.paragraphs[i].images) {
                    await import(`../assets/img/${image}`).then((res) => {
                        let _snapshot = this.state.auxArray;
                        if (!Array.isArray(_snapshot[i]))
                            _snapshot[i] = [];
                        _snapshot[i].push((
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
                    text: this.mapNewLineToBr(this.props.paragraphs[i].text),
                    isGallery: this.props.paragraphs[i].isGallery,
                    images: this.state.auxArray[i]
                })
                this.setState({
                    paragraphs: snapshot
                })
            })
        }

    }

    createGaleries = () => {
        for (let i = 0; i < this.state.paragraphs.length; i++) {
            if (this.state.paragraphs[i].isGallery && Array.isArray(this.state.paragraphs[i].images)) {
                let snapshot = this.state.paragraphs;
                snapshot[i].images = (
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

    mapParagraphsToJSX = () => {
        return this.state.paragraphs.map((item, key) => {
            return (
                <div className='paragraph-container' key={key}>
                    <div id='paragraph-text-container'>
                        {item.text}
                    </div>
                    <div id='paragraph-image-container'>
                        {item.images}
                    </div>
                </div>
            )
        })
    }

    componentDidUpdate(){
        this.createGaleries();
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
                        {this.mapParagraphsToJSX()}
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