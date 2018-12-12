import React from 'react';
import '../assets/stylesheets/full-text-display.css'
import FullscreenImage from './FullscreenImage';


export default class FullTextDisplayNoFullscreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            fullTextToggle: false,
            textFullStyle: {
                display: 'none'
            },
            buttonText: 'Vezi mai multe',
            fullscreenImage: null
        }
    }

    toggleFullText = () => {
        //Toggle the display state of the full text
        this.setState({
            fullTextToggle: !this.state.fullTextToggle,
            textFullStyle: {
                display: this.state.fullTextToggle ? 'none' : 'block'
            },
            buttonText: this.state.fullTextToggle ? 'Vezi mai multe' : 'Vezi mai putine'
        })
    }

    async componentWillMount() {
        //Set the image node of the component
        if (this.props.pictures) {
            for (let item of this.props.pictures) {
                await import(`../assets/img/${item}`).then((image) => {
                    let temp = this.state.images;
                    temp.push(image);
                    this.setState({
                        images: temp
                    })
                });
            }

        }
    }

    showImageFullscreen = (index, pictures) => {
        this.setState({
            fullscreenImage: (<FullscreenImage index={index} images={pictures} onClose={this.closeFullscreenImage} />)
        })
    }

    closeFullscreenImage = () => {
        this.setState({
            fullscreenImage: null
        })
    }

    render() {
        return (
            <div>
                {this.state.fullscreenImage}
                <div className='full-text-display-no-fullscreen-grid-container' style={{
                    ...this.props.style, color: 'black',
                    height: '86.3vh',
                    position: 'relative',
                    top: 0,
                }}>
                    <div style={{
                        backgroundColor: 'rgb(246,246,246)', margin: 0, display: 'flex',
                        flexDirection: 'column', gridColumn: '1/2'
                    }}>
                        <h2 style={{ marginTop: '30px', fontFamily: 'Century Gothic', fontStyle: 'bold' }}> <img alt='logo' src={this.props.logo} style={{
                            width: '64px',
                            display: 'inline-block', margin: '20px'
                        }} />{this.props.title}</h2>
                        <p style={{ fontSize: '1.5rem', margin: '0px 20px' }}>{this.props.textChopped}</p>
                        <div style={{ ...this.state.textFullStyle, transition: 'all 2s ease-out' }}>
                            <p style={{
                                fontSize: '1.5rem', margin: '0px 20px',
                                transition: 'all 2s ease-out'
                            }}>{this.props.textFull}</p>
                        </div>
                        <button style={{
                            backgroundColor: 'transparent', 'color': 'rgb(37,37,37)',
                            borderWidth: '2px', borderRadius: '8px', borderColor: 'rgb(37,37,37)',
                            alignSelf: 'center', margin: '50px', width: '30%',
                            fontSize: '1.7rem'
                        }} onClick={this.toggleFullText}>{this.state.buttonText}</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: this.props.color, gridColumn: '2/3' }}>
                        {this.state.images.map((item, key) => (<img alt={item}
                            onClick={(event) => { this.showImageFullscreen(key, this.props.pictures) }} src={item} key={key}
                            style={{ maxWidth: '95%', margin: '20px 0 20px 2.5%' }} />))} {/* The image node */}
                    </div>
                </div>
            </div>
        );
    }
}