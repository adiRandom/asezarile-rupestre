import React from 'react'
import { Redirect } from 'react-router'
import * as backgroundImage from "../assets/img/MIH_6583.JPG";
import "../assets/stylesheets/homepage.css"
import Navbar from './Navbar';
import InfoMenu from './InfoMenu.js'
import InfoDisplay from './InfoDisplay';
import History from './History'
import Legends from './Legends';
import Bibliography from "./Bibliography"

export default class Homepege extends React.Component {

    constructor() {
        super();
        this.state = {
            redirect: null,
            icons: [
                "shield",
                "mt",
                "path",
                "crux",
                "vase",
                "book-icon"
            ],
            items: [
                "Istorie",
                "Geografie",
                "Turism",
                "Religie",
                "Legende",
                "Bibliografie"
            ],
            infoDisplayTitle: null,
            infoDisplayText: null,
            infoDisplaySplitMedia: null,
            infoDisplayImages: null,
            isLegends: false,
            isBibliography: false
        }
    }
    redirectToMap = () => {
        this.setState({
            redirect: (<Redirect to="/harta"></Redirect>)
        })
    }


    importData = async (fileName) => {
        await import(`../data/${fileName}`).then(async (data) => {
            if (!data.paragraphs) {
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
                                isBibliography: false,
                                isLegends: false,
                                isHistory: false
                            })
                        })
                    }
                    else {
                        this.setState({
                            infoDisplaySplitMedia: {
                                media: []
                            },
                            aux: []
                        }, async () => {
                            for (let _media of data.splitMedia.media) {
                                await import(`../assets/${_media}`).then((res) => {
                                    let temp = this.state.aux;
                                    temp.push(res);
                                    this.setState({
                                        aux: temp
                                    })
                                })
                            }
                            this.setState((prev) => ({
                                infoDisplayTitle: data.title,
                                infoDisplayText: data.text,
                                infoDisplaySplitMedia: {
                                    type: data.splitMedia.type,
                                    isGallery: data.isGallery,
                                    media: prev.aux
                                },
                                infoDisplayShortText: data.shortText,
                                infoDisplayImages: data.images,
                                isBibliography: false,
                                isLegends: false,
                                isHistory: false
                            }))
                        })
                    }
                }
                else {
                    this.setState({
                        infoDisplayTitle: data.title,
                        infoDisplayText: data.text,
                        infoDisplayImages: data.images,
                        isBibliography: false,
                        isLegends: false,
                        infoDisplaySplitMedia: null,
                        infoDisplayShortText: data.shortText,
                        isHistory: false
                    })
                }
            }
            else {
                this.setState({
                    infoDisplayTitle: data.title,
                    infoDisplayShortText: data.shortText,
                    infoDisplayImages: data.images,
                    infoDisplayParagraphs: data.paragraphs,
                    isBibliography: false,
                    isLegends: false,
                    isHistory: true
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
                        legends: data.legends,
                        isLegends: true,
                        isBibliography: false,
                        isHistory: false
                    });
                }); break;

            case "Bibliografie":
                await import("../data/bibliography.json").then((data) => {
                    this.setState({
                        titles: data.titles,
                        isBibliography: true,
                        isLegends: false,
                        isHistory: false
                    });
                }); break;
        }
    }


    render() {
        console.log(this.state);
        return (
            <div id="main-flex-continer">
                <Navbar></Navbar>
                <div id="image-container">
                    <img id="main-image" src={backgroundImage} alt="bozioru"></img>
                    <div id="main-text-container">
                        <h2 id="title-up">Asezarile Rupestre</h2>
                        <h1 id="title-down">Bozioru</h1>
                        <br className="sm-break"></br>
                        <p id="description">O întoarcere în peisajul creștinismului timpuriu,
                        unde pietrele spun povestea locului de la începutul istoriei și până acum.</p>
                        <button id="map-button" onClick={this.redirectToMap}>Catre harta</button>
                        {this.state.redirect}
                    </div>
                </div>
                <InfoMenu onClick={this.onClick} icons={this.state.icons} items={this.state.items} />
                {!this.state.isBibliography && !this.state.isLegends && !this.state.isHistory && this.state.infoDisplayTitle &&
                    <InfoDisplay text={this.state.infoDisplayText} title={this.state.infoDisplayTitle} shortText={this.state.infoDisplayShortText}
                        splitMedia={this.state.infoDisplaySplitMedia} images={this.state.infoDisplayImages}></InfoDisplay>}
                {this.state.isHistory && <History paragraphs={this.state.infoDisplayParagraphs}
                    title={this.state.infoDisplayTitle} images={this.state.infoDisplayImages} shortText={this.state.infoDisplayShortText} />}
                {this.state.isLegends && <Legends legends={this.state.legends}></Legends>}
                {this.state.isBibliography && <Bibliography titles={this.state.titles} />}
            </div>
        )
    }
}