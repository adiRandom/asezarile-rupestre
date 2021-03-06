import React from 'react'
import { Redirect } from 'react-router'
import * as backgroundImage from "../assets/img/MIH_6583.JPG";
import "../assets/stylesheets/homepage.css"
import Navbar from './Navbar';
import InfoMenu from './InfoMenu.js'
import InfoDisplay from './InfoDisplay';
import History from './History'
import Bibliography from "./Bibliography"
import Legends from './Legends';

export default class Homepege extends React.Component {

    constructor() {
        super();
        this.state = {
            redirect: null,
            icons: [
                "mt",
                "path",
                "shield",
                "crux",
                "vase",
                "book-icon"
            ],
            items: [
                "Geografie",
                "Turism",
                "Istorie",
                "Religie",
                "Legende",
                "Bibliografie"
            ],
            infoDisplayTitle: null,
            infoDisplayText: null,
            infoDisplaySplitMedia: null,
            infoDisplayImages: null,
            infoDislayVideo: null,
            isLegends: false,
            isBibliography: false,
            infoDisplayLeftBanner: null,
            infoDisplayRightBanner: null,
            navbarColor: 'rgba(44, 60, 76, 0.3)',
            goDown: false
        }
    }
    redirectToMap = () => {
        this.setState({
            redirect: (<Redirect to="/harta"></Redirect>)
        })
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }



    importData = async (fileName) => {
        await import(`../data/${fileName}`).then(async (data) => {
            if (!data.content) {
                if (data.splitMedia) {
                    if (!Array.isArray(data.splitMedia.media)) {
                        await import(`../assets/${data.splitMedia.media}`).then((media) => {
                            this.setState({
                                infoDisplayTitle: data.title,
                                infoDisplayText: data.text,
                                infoDisplaySplitMedia: {
                                    type: data.splitMedia.type,
                                    media: media,
                                    isGallery: data.isGallery
                                },
                                infoDisplayShortText: data.shortText,
                                infoDisplayImages: data.images,
                                infoDislayVideo: data.video,
                                infoDisplayLeftBanner: data.leftBanner,
                                infoDisplayRightBanner: data.rightBanner,
                                isBibliography: false,
                                isLegends: false,
                                isHistory: false,
                                goDown: true
                            })
                        })
                    }
                }
                else {
                    this.setState({
                        infoDisplayTitle: data.title,
                        infoDisplayText: data.text,
                        infoDisplayImages: data.images,
                        infoDislayVideo: data.video,
                        infoDisplayLeftBanner: data.leftBanner,
                        infoDisplayRightBanner: data.rightBanner,
                        isBibliography: false,
                        isLegends: false,
                        infoDisplaySplitMedia: null,
                        infoDisplayShortText: data.shortText,
                        isHistory: false,
                        goDown: true
                    })
                }
            }
            else {
                this.setState({
                    infoDisplayTitle: data.title,
                    infoDisplayShortText: data.shortText,
                    infoDislayVideo: data.video,
                    infoDisplayImages: data.images,
                    infoDisplayContent: data.content,
                    infoDisplayLeftBanner: data.leftBanner,
                    infoDisplayRightBanner: data.rightBanner,
                    isBibliography: false,
                    isLegends: false,
                    isHistory: true,
                    goDown: true
                });
            }
        });
    }

    onClick = async (key) => {
        switch (key) {
            case "Istorie": await this.importData("history.json"); break;

            case "Geografie":
                await this.importData("geography.json"); break;

            case "Turism": await this.importData("turism.json");
                break;

            case "Religie":
                await this.importData("religie.json"); break;

            case "Legende":
                await import("../data/legends.json").then((data) => {
                    this.setState({
                        legends: data.content,
                        isLegends: true,
                        isBibliography: false,
                        isHistory: false,
                        goDown: true
                    });
                }); break;

            case "Bibliografie":
                await import("../data/bibliography.json").then((data) => {
                    this.setState({
                        titles: data.titles,
                        isBibliography: true,
                        isLegends: false,
                        isHistory: false,
                        goDown: true
                    });
                }); break;
        }
    }

    componentDidUpdate() {
        if (this.state.goDown) {
            window.scrollBy(0, Math.max(document.documentElement.clientHeight, window.innerHeight || 0));
        }
    }

    handleScroll = () => {
        this.resetGoDown();
        this.changeNavbarColor();
    }

    resetGoDown = () => {
        this.setState({
            goDown: false
        })
    }

    changeNavbarColor = () => {
        let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        let current = window.pageYOffset;
        if (current >= h && this.state.navbarColor === "rgba(44, 60, 76, 0.3)")
            this.setState({
                navbarColor: "rgb(44, 60, 76)"
            });
        if (current < h && this.state.navbarColor === "rgb(44, 60, 76)")
            this.setState({
                navbarColor: "rgba(44, 60, 76, 0.3)"
            })
    }



    render() {
        return (
            <div id="main-flex-continer">
                <Navbar color={this.state.navbarColor}></Navbar>
                <div id="image-container">
                    <img id="main-image" src={backgroundImage} alt="bozioru"></img>
                    <div id="main-text-container">
                        <h2 id="title-up">Mărturii în piatră</h2>
                        <h1 id="title-down">Așezările rupestre de la Bozioru</h1>
                        <br className="sm-break"></br>
                        <p id="description">O întoarcere în peisajul creștinismului timpuriu,
                        unde pietrele spun povestea locului de la începutul istoriei și până acum.</p>
                        <button id="map-button" onClick={this.redirectToMap}>Către hartă</button>
                        {this.state.redirect}
                    </div>
                </div>
                <InfoMenu onClick={this.onClick} icons={this.state.icons} items={this.state.items} />
                {!this.state.isBibliography && !this.state.isLegends && !this.state.isHistory && this.state.infoDisplayTitle &&
                    <InfoDisplay leftBanner={this.state.infoDisplayLeftBanner} video={this.state.infoDislayVideo}
                        rightBanner={this.state.infoDisplayRightBanner} text={this.state.infoDisplayText}
                        title={this.state.infoDisplayTitle} shortText={this.state.infoDisplayShortText}
                        splitMedia={this.state.infoDisplaySplitMedia} images={this.state.infoDisplayImages}></InfoDisplay>}
                {this.state.isHistory && <History leftBanner={this.state.infoDisplayLeftBanner}
                    rightBanner={this.state.infoDisplayRightBanner} content={this.state.infoDisplayContent}
                    title={this.state.infoDisplayTitle} shortText={this.state.infoDisplayShortText} />}
                {this.state.isLegends && <Legends placeholder="Selecteaza mai intai o legenda" content={this.state.legends}></Legends>}
                {this.state.isBibliography && <Bibliography titles={this.state.titles} />}
            </div>
        )
    }
}