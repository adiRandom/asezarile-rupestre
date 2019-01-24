import React from 'react';
import "../assets/stylesheets/history.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MenuPickerInfoDisplay from './MenuPickerInfoDisplay';

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
                        <hr />
                        <MenuPickerInfoDisplay content={this.props.content} />
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