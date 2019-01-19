import React from 'react'
import { Redirect } from 'react-router'
import * as backgroundImage from "../assets/img/MIH_6583.JPG";
import "../assets/stylesheets/homepage.css"
import Navbar from './Navbar';
import InfoMenu from './InfoMenu.js'
import InfoDisplay from './InfoDisplay';


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

    importSplitMediaWhenArray = (splitMedia) => {
        this.setState({
            infoDisplaySplitMedia: []
        }, () => {
            for (let _media of splitMedia) {
                if (!Array.isArray(_media.media)) {
                    await import(`../assets/${_media.media}`).then((res) => {
                        let temp = this.state.infoDisplaySplitMedia;
                        temp.push({
                            media: res,
                            type: _media.type,
                            isGallery: _media.isGallery
                        });
                        this.setState({
                            infoDisplaySplitMedia: temp
                        })
                    })
                }
                else {
                    this.setState({
                        auxArray: []
                    }, () => {
                        let temp = this.state.infoDisplaySplitMedia;
                        for (let element of _media.media) {
                            await import(`../assets/${element}`).then((res) => {
                                let _temp = this.state.auxArray;
                                _temp.push(res);
                                this.setState({
                                    auxArray: _temp
                                })
                            })
                        }
                        temp.push({
                            media: this.state.auxArray,
                            type: _media.type,
                            isGallery: _media.isGallery
                        })
                        this.setState({
                            infoDisplaySplitMedia: temp
                        })
                    })
                }
            }
        });
    }

    onClick = async (key) => {
        switch (key) {
            case "Istorie":
                await import("../data/history.json").then(async (data) => {
                    if (data.splitMedia) {
                        if (!Array.isArray(data.splitMedia)) {
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
                                        isLegends: false
                                    })
                                })
                            }
                            else {
                                this.setState({
                                    infoDisplaySplitMedia: {
                                        media: []
                                    }
                                }, () => {
                                    for (let _media of data.splitMedia.media) {
                                        await import(`../assets/${_media}`).then((res) => {
                                            let temp = this.state.infoDisplaySplitMedia;
                                            temp.push(res);
                                            this.setState({
                                                infoDisplaySplitMedia: {
                                                    media: temp
                                                }
                                            })
                                        })
                                    }
                                    this.setState({
                                        infoDisplayTitle: data.title,
                                        infoDisplayText: data.text,
                                        infoDisplaySplitMedia: {
                                            type: data.splitMedia.type,
                                            isGallery: data.isGallery
                                        },
                                        infoDisplayShortText: data.shortText,
                                        infoDisplayImages: data.images,
                                        isBibliography: false,
                                        isLegends: false
                                    })
                                })
                            }
                        }
                        else {
                            this.setState({
                                infoDisplayTitle: data.title,
                                infoDisplayText: data.text,
                                infoDisplayShortText: data.shortText,
                                infoDisplayImages: data.images,
                                isBibliography: false,
                                isLegends: false
                            });
                            this.importSplitMediaWhenArray(data.splitMedia);
                        }
                    }
                    else {
                        this.setState({
                            infoDisplayTitle: data.title,
                            infoDisplayText: data.text,
                            infoDisplayImages: data.images,
                            isBibliography: false,
                            isLegends: false,
                            infoDisplaySplitMedia: null
                        })
                    }
                }); break;

            case "Geografie":
                await import("../data/geography.json").then(async (data) => {
                    if (data.splitMedia) {
                        if (!Array.isArray(data.splitMedia)) {
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
                                        isLegends: false
                                    })
                                })
                            }
                            else {
                                this.setState({
                                    infoDisplaySplitMedia: {
                                        media: []
                                    }
                                }, () => {
                                    for (let _media of data.splitMedia.media) {
                                        await import(`../assets/${_media}`).then((res) => {
                                            let temp = this.state.infoDisplaySplitMedia;
                                            temp.push(res);
                                            this.setState({
                                                infoDisplaySplitMedia: {
                                                    media: temp
                                                }
                                            })
                                        })
                                    }
                                    this.setState({
                                        infoDisplayTitle: data.title,
                                        infoDisplayText: data.text,
                                        infoDisplaySplitMedia: {
                                            type: data.splitMedia.type,
                                            isGallery: data.isGallery
                                        },
                                        infoDisplayShortText: data.shortText,
                                        infoDisplayImages: data.images,
                                        isBibliography: false,
                                        isLegends: false
                                    })
                                })
                            }
                        }
                        else {
                            this.setState({
                                infoDisplayTitle: data.title,
                                infoDisplayText: data.text,
                                infoDisplayShortText: data.shortText,
                                infoDisplayImages: data.images,
                                isBibliography: false,
                                isLegends: false
                            });
                            this.importSplitMediaWhenArray(data.splitMedia);
                        }
                    }
                    else {
                        this.setState({
                            infoDisplayTitle: data.title,
                            infoDisplayText: data.text,
                            infoDisplayImages: data.images,
                            isBibliography: false,
                            isLegends: false,
                            infoDisplaySplitMedia: null
                        })
                    }
                }); break;

            case "Turism":
                await import("../data/turism.json").then(async (data) => {
                    if (data.splitMedia) {
                        if (!Array.isArray(data.splitMedia)) {
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
                                        isLegends: false
                                    })
                                })
                            }
                            else {
                                this.setState({
                                    infoDisplaySplitMedia: {
                                        media: []
                                    }
                                }, () => {
                                    for (let _media of data.splitMedia.media) {
                                        await import(`../assets/${_media}`).then((res) => {
                                            let temp = this.state.infoDisplaySplitMedia;
                                            temp.push(res);
                                            this.setState({
                                                infoDisplaySplitMedia: {
                                                    media: temp
                                                }
                                            })
                                        })
                                    }
                                    this.setState({
                                        infoDisplayTitle: data.title,
                                        infoDisplayText: data.text,
                                        infoDisplaySplitMedia: {
                                            type: data.splitMedia.type,
                                            isGallery: data.isGallery
                                        },
                                        infoDisplayShortText: data.shortText,
                                        infoDisplayImages: data.images,
                                        isBibliography: false,
                                        isLegends: false
                                    })
                                })
                            }
                        }
                        else {
                            this.setState({
                                infoDisplayTitle: data.title,
                                infoDisplayText: data.text,
                                infoDisplayShortText: data.shortText,
                                infoDisplayImages: data.images,
                                isBibliography: false,
                                isLegends: false
                            });
                            this.importSplitMediaWhenArray(data.splitMedia);
                        }
                    }
                    else {
                        this.setState({
                            infoDisplayTitle: data.title,
                            infoDisplayText: data.text,
                            infoDisplayImages: data.images,
                            isBibliography: false,
                            isLegends: false,
                            infoDisplaySplitMedia: null
                        })
                    }
                }); break;

            case "Religie":
                await import("../data/religie.json").then(async (data) => {
                    if (data.splitMedia) {
                        if (!Array.isArray(data.splitMedia)) {
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
                                        isLegends: false
                                    })
                                })
                            }
                            else {
                                this.setState({
                                    infoDisplaySplitMedia: {
                                        media: []
                                    }
                                }, () => {
                                    for (let _media of data.splitMedia.media) {
                                        await import(`../assets/${_media}`).then((res) => {
                                            let temp = this.state.infoDisplaySplitMedia;
                                            temp.push(res);
                                            this.setState({
                                                infoDisplaySplitMedia: {
                                                    media: temp
                                                }
                                            })
                                        })
                                    }
                                    this.setState({
                                        infoDisplayTitle: data.title,
                                        infoDisplayText: data.text,
                                        infoDisplaySplitMedia: {
                                            type: data.splitMedia.type,
                                            isGallery: data.isGallery
                                        },
                                        infoDisplayShortText: data.shortText,
                                        infoDisplayImages: data.images,
                                        isBibliography: false,
                                        isLegends: false
                                    })
                                })
                            }
                        }
                        else {
                            this.setState({
                                infoDisplayTitle: data.title,
                                infoDisplayText: data.text,
                                infoDisplayShortText: data.shortText,
                                infoDisplayImages: data.images,
                                isBibliography: false,
                                isLegends: false
                            });
                            this.importSplitMediaWhenArray(data.splitMedia);
                        }
                    }
                    else {
                        this.setState({
                            infoDisplayTitle: data.title,
                            infoDisplayText: data.text,
                            infoDisplayImages: data.images,
                            isBibliography: false,
                            isLegends: false,
                            infoDisplaySplitMedia: null
                        })
                    }
                }); break;

            case "Legende":
                this.state = {
                    isLegends: true,
                    isBibliography: false
                }; break;

            case "Bibliografie":
                this.state = {
                    isBibliography: true,
                    isLegends: false
                }; break;
        }
    }

    render() {
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
                {!this.state.isBibliography && !this.state.isLegends && this.state.infoDisplayTitle &&
                    <InfoDisplay text={this.state.infoDisplayText} title={this.state.infoDisplayTitle} shortText={this.state.infoDisplayShortText}
                        splitMedia={this.state.infoDisplaySplitMedia} images={this.state.infoDisplayImages}></InfoDisplay>}
            </div>
        )
    }
}