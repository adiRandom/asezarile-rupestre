import React from 'react'
import "../assets/stylesheets/info-display.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

//The structure of the json: title,text,images,splitMedia
//SplitMedia has to specifie the type of media "image" "video"
//The text prop can either be an array for two halves of the text or a string

function deepCompare() {
    var i, l, leftChain, rightChain;

    function compare2Objects(x, y) {
        var p;

        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        // Compare primitives and functions.     
        // Check if both arguments link to the same object.
        // Especially useful on the step where we compare prototypes
        if (x === y) {
            return true;
        }

        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        // At last checking prototypes as good as we can
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        // Quick checking of one object being a subset of another.
        // todo: cache the structure of arguments[0] for performance
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            }
            else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            }
            else if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof (x[p])) {
                case 'object':
                case 'function':

                    leftChain.push(x);
                    rightChain.push(y);

                    if (!compare2Objects(x[p], y[p])) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                    break;

                default:
                    if (x[p] !== y[p]) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    if (arguments.length < 1) {
        throw "Need two or more arguments to compare";
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = [];
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
}

Array.prototype.isEqual = function (anotherArray) {
    if (!Array.isArray(anotherArray))
        return false
    if (anotherArray.length !== this.length)
        return false;
    for (let i = 0; i < this.length; i++)
        if (this[i] !== anotherArray[i])
            return false;
    return true;
}

function isObjectEqualTo(firstObject, anotherObject) {
    return deepCompare(firstObject, anotherObject)
}

export default class InfoDisplay extends React.Component {

    constructor(props) {
        super(props);
        console.log()
        this.state = {
            splitMedia: null,
            images: [],
            showAllText: false,
            fullTextDispalyStyle: {
                display: 'none'
            },
            leftBanner: null,
            rightBanner: null
        }
        if (props.splitMedia)
            this.createSplitMedia(this.props.splitMedia);
    }


    mapNewLineToBr = (_text) => {
        //Map \r\n to <br>
        if (_text) {
            if (!Array.isArray(_text)) {
                this.setState({
                    text: _text.split('\r\n').map((item, key) => {
                        return <span className="paragraph" key={key}>{item}<br /></span>
                    })
                })
            }
            else {
                let result = [];
                for (let text of _text) {
                    result.push(text.split('\r\n').map((item, key) => {
                        return <span className="paragraph" key={key}>{item}<br /></span>
                    }))
                }
                this.setState({
                    text: result
                })
            }
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

        this.mapNewLineToBr(this.props.text);
        if (this.props.splitMedia)
            this.createSplitMedia(this.props.splitMedia);
    }

    async shouldComponentUpdate(nextProps) {
        if (!isObjectEqualTo(nextProps, this.props)) {
            this.setState({
                images: [],
                splitMedia: null,
                showAllText: false,
                fullTextDispalyStyle: {
                    display: 'none'
                },
                text: "",
                leftBanner: null,
                rightBanner: null
            }, async () => {
                if (nextProps.images &&
                    isObjectEqualTo(nextProps.images, this.props.images)) {
                    for (let i = 0; i < nextProps.images.length; i++) {
                        await import(`../assets/img/${nextProps.images[i]}`).then((image) => {
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

                if (nextProps.leftBanner) {
                    await import(`../assets/img/${nextProps.leftBanner}`).then((banner) => {
                        this.setState({
                            leftBanner: banner
                        })
                    })
                }

                if (nextProps.rightBanner) {
                    await import(`../assets/img/${nextProps.rightBanner}`).then((banner) => {
                        this.setState({
                            rightBanner: banner
                        })
                    })
                }

                this.mapNewLineToBr(nextProps.text)
                return true;
            });
        }
        return false;
    }

    createSplitMedia = (source) => {
        if (source.type === "image") {
            this.setState({
                splitMedia: (<img alt="split-media" className="split-text-picture" src={source.media} />)
            }
            )
        }
        else {
            this.setState({
                splitMedia: (<video className="split-text-video" controls src={source.media}></video>)
            })
        }
    }

    getButtonMessage = () => {
        return this.state.showAllText ? 'Vezi mai putin' : 'Vezi mai mult'
    }

    toggleFullTextDisplay = () => {
        this.setState((prevState) => ({
            showAllText: !prevState.showAllText,
            fullTextDispalyStyle: {
                display: prevState.fullTextDispalyStyle.display === 'none' ? 'grid' : 'none'
            }
        }), () => {
            if (this.state.showAllText === false) {
                window.scrollBy(0, 100);
            }
        })
        //Make the page scroll a bit to fix the scrolling bug

    }


    render() {
        console.log(this.state.splitMedia)
        return (
            <div id='info-display-flex-container'>
                <div id='info-display-title-container'>
                    <h1 id='info-display-title'>{this.props.title}</h1>
                </div>
                <div id='info-display-content-container'>
                    <div id="info-display-short-text-wrapper">
                        {this.props.shortText}
                    </div>
                    {this.state.splitMedia}
                    <div id="info-display-full-text-grid" style={this.state.fullTextDispalyStyle}>
                        {this.state.leftBanner && (<div id="info-display-full-text-left-banner">
                            <img src={this.state.leftBanner} className="banner" alt="left-banner"></img>
                        </div>)}
                        <div id='info-display-full-text-container' >
                            {!Array.isArray(this.props.text) && (<div id="info-display-text-wrapper">{this.state.text}</div>)}
                        </div>
                        {this.state.rightBanner && (<div id="info-display-full-text-right-banner">
                            <img src={this.state.rightBanner} className="banner" alt="right-banner"></img>
                        </div>)}
                    </div>
                    {this.state.text &&
                        <div id='read-more-button-wrapper'>
                            <button id='read-more-button' onClick={this.toggleFullTextDisplay}>
                                <span>{this.getButtonMessage()}</span>
                            </button>
                        </div>
                    }
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