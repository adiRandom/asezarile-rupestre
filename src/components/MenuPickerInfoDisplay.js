import React from "react";
import "../assets/stylesheets/menu-picker-info-display.css"
import { Carousel } from 'react-responsive-carousel';
import { CSSTransitionGroup } from 'react-transition-group'



export default class MenuPickerInfoDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: [],
            text: this.props.placeholder,
            style: {
                display: "flex"
            },
            importedImages: [],
            curentItem: 0,
            newItemSelected: false,
            galery:null,
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
            newItemSelected: true,
        }, async () => {
            for (let image of this.props.content[key].images) {
                await import(`../assets/img/${image}`).then((res) => {
                    let temp = this.state.importedImages;
                    temp.push(<img src={res} alt="item-image" className="content-image"></img>)
                    this.setState({
                        importedImages: temp
                    })
                })
            }
        });


    }

    componentDidUpdate() {
        if (this.state.curentItem != -1)
            if (this.state.newItemSelected && this.state.importedImages.length === this.props.content[this.state.curentItem].images.length)
                this.setState({
                    style: {
                        display: "grid"
                    },
                    text: (
                        <CSSTransitionGroup
                            transitionName="text-fade"
                            transitionAppear={true}
                            transitionAppearTimeout={4000}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <div>
                                {this.mapNewLineToBr(this.props.content[this.state.curentItem].text)}
                            </div>
                        </CSSTransitionGroup>
                    ),
                    newItemSelected: false,
                    galery:null
                },()=>{
                    setTimeout(this.displayImages,4000);
                })
    }

    displayImages=()=>{
        this.setState({
            galery:(<Carousel showIndicators={false} autoplay={true} showThumbs={false} >
                {this.state.importedImages}
            </Carousel>)
        })
    }

    async componentDidMount() {
        const menu = this.props.content.map((item, key) => {
            return <button key={key} onClick={() => this.selectItem(key)} className="content-menu-button">{item.title}</button>
        });

        this.setState({
            menuItems: menu
        });
    }

    render() {
        return (
                <div id="content-main-flex-container">
                    <div id="content-menu-bar">
                        {this.state.menuItems}
                    </div>
                    <div id='content-text-zone' style={this.state.style}>
                        {this.state.text}
                        {this.state.curentItem >= 0 && this.props.content[this.state.curentItem].isGalery && this.state.importedImages.length === this.props.content[this.state.curentItem].images.length &&
                            (<div id='galery-container'>
                                {this.state.galery}
                            </div>
                            )
                        }
                        {this.state.curentItem >= 0 && !this.props.content[this.state.curentItem].isGalery && this.state.importedImages.length === this.props.content[this.state.curentItem].images.length &&
                            (<div id="content-images">
                                {this.state.importedImages}
                            </div>)
                        }
                    </div>
                </div>
        )
    }
}