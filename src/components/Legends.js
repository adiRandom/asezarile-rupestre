import React from "react";
import "../assets/stylesheets/menu-picker-info-display.css"
import "../assets/stylesheets/legends.css"
import { Carousel } from 'react-responsive-carousel';
import { CSSTransitionGroup } from 'react-transition-group'



export default class Legends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: [],
            text: (
                <CSSTransitionGroup
                    transitionName="text-fade"
                    transitionAppear={true}
                    transitionAppearTimeout={4000}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        {this.mapNewLineToBr(this.props.content[0].text)}
                    </div>
                </CSSTransitionGroup>
            ),
            style: {
                display: "flex"
            },
            importedImages: [],
            video: null,
            curentItem: 0,
            newItemSelected: false,
            gallery: null,
        }
    }

    mapNewLineToBr = (_text) => {
        //Map \r\n to <br>
        return _text.split('\r\n').map((item, key) => {
            return <span className="paragraph" key={key}>{item}<br /></span>
        })
    }

    selectItem = async (key) => {
        this.setState({
            importedImages: [],
            curentItem: key,
            text: "",
            video: null,
            newItemSelected: true,
        }, async () => {
            if (!this.props.content[key].video) {
                for (let image of this.props.content[key].images) {
                    await import(`../assets/img/${image}`).then((res) => {
                        let temp = this.state.importedImages;
                        temp.push(<img src={res} alt="item-image" className="content-image"></img>)
                        this.setState({
                            importedImages: temp
                        })
                    })
                }
            }
            else {
                await import(`../assets/video/${this.props.content[key].video}`).then((res) => {
                    this.setState({
                        video: res
                    })
                })
            }
        });


    }

    componentDidUpdate() {
        if (this.state.curentItem != -1)
            if (this.state.newItemSelected && ((this.props.content[this.state.curentItem].images && this.state.importedImages.length === this.props.content[this.state.curentItem].images.length) || (this.state.video))) {
                this.setState({
                    text: (
                        <CSSTransitionGroup
                            transitionName="text-fade"
                            transitionAppear={true}
                            transitionAppearTimeout={3000}
                            transitionEnter={false}
                            transitionLeave={false}
                            style={{"marginTop":"5vh"}}
                            className="a-span"
                            >
                            <div>
                                {this.mapNewLineToBr(this.props.content[this.state.curentItem].text)}
                            </div>
                        </CSSTransitionGroup>
                    ),
                    newItemSelected: false,
                    gallery: null
                }, () => {
                    setTimeout(this.displayMedia, 3000);
                })
            }
    }

    displayMedia = () => {
        if (!this.state.video) {
            if (this.state.importedImages.length > 1)
                this.setState({
                    gallery: (<Carousel showIndicators={false} autoPlay={true} showThumbs={false} >
                        {this.state.importedImages}
                    </Carousel>)
                })
            else
                this.setState({
                    gallery: this.state.importedImages[0]
                })

        }
        else {
            this.setState({
                gallery: (<video autoPlay={true} className="gallery-video" src={this.state.video} loop={true}></video>)
            })
        }
    }

    async componentDidMount() {
        const menu = this.props.content.map((item, key) => {
            return <button key={key} onClick={() => this.selectItem(key)} className="content-menu-button">{item.title}</button>
        });

        this.setState({
            menuItems: menu
        });

        if (this.props.content[0].images)
            for (let image of this.props.content[0].images) {
                await import(`../assets/img/${image}`).then((res) => {
                    let temp = this.state.importedImages;
                    temp.push(<img src={res} alt="item-image" className="content-image"></img>)
                    this.setState({
                        importedImages: temp
                    })
                })
            }
        else if (this.props.content[0].video)
            await import(`../assets/video/${this.props.content[0].video}`).then((res) => {
                this.setState({
                    video: res
                })
            })

        this.displayMedia();
    }

    render() {
        return (
            <div id="content-main-flex-container" className="legends-main-container">
                <div id="content-menu-bar">
                    {this.state.menuItems}
                </div>
                <div id='content-text-zone' style={this.state.style}>
                    {this.state.text}
                    {this.state.curentItem >= 0 && ((this.props.content[this.state.curentItem].images && this.state.importedImages.length === this.props.content[this.state.curentItem].images.length) || this.state.video) &&
                        (<div id='gallery-container'>
                            {this.state.gallery}
                        </div>
                        )
                    }
                </div>
            </div>
        )
    }
}