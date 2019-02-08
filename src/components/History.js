import React from 'react';
import "../assets/stylesheets/history.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MenuPickerInfoDisplay from './MenuPickerInfoDisplay';

export default class History extends React.Component {
    constructor(props) {
        super(props);
        console.log("The props")
        console.log(this.props)
        this.state = {
            paragraphs: [],
            showAllText: false,
            fullTextDispalyStyle: {
                display: 'none'
            },
            images: [],
            leftBanner: null,
            rightBanner: null
        }

        this.count = 0;
    }

    mapNewLineToBr = (_text) => {
        //Map \r\n to <br>
        return _text.split('\r\n').map((item, key) => {
            return <span className="paragraph" key={key}>{item}<br /></span>
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
        if (this.props.leftBanner) {
            await import(`../assets/img/${this.props.leftBanner}`).then((banner) => {
                this.setState({
                    leftBanner: banner
                })
            })
        }

        if (this.props.rightBanner) {
            await import(`../assets/img/${this.props.rightBanner}`).then((banner) => {
                this.setState({
                    rightBanner: banner
                })
            })
        }
    }

    render() {
        return (
            <div id='history-info-display-flex-container'>
                <div id='history-info-display-title-container'>
                    <h1 id='history-info-display-title'>{this.props.title}</h1>
                </div>
                <div id='history-info-display-content-container'>
                    <div id="history-info-display-short-text-grid">
                        {this.state.leftBanner && (<div id="history-info-display-full-text-left-banner">
                            <img src={this.state.leftBanner} className="banner" alt="left-banner"></img>
                        </div>)}
                        <div id="history-info-display-short-text-wrapper">
                            {this.mapNewLineToBr(this.props.shortText)}
                        </div>
                        {this.state.rightBanner && (<div id="history-info-display-full-text-right-banner">
                            <img src={this.state.rightBanner} className="banner" alt="right-banner"></img>
                        </div>)}
                    </div>
                    <div id='history-info-display-full-text-container' style={this.state.fullTextDispalyStyle}>
                        <hr />
                        <MenuPickerInfoDisplay placeholder="Selecteaza mai intai un obiectiv" content={this.props.content} />
                    </div>
                    <div id='read-more-button-wrapper'>
                        <button id='read-more-button' onClick={this.toggleFullTextDisplay}>
                            <span>{this.getButtonMessage()}</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}