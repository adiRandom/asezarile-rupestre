import React from 'react';
import '../assets/stylesheets/full-text-display.css'


export default class FullTextDisplayNoFullscreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            fullTextToggle:false,
            textFullStyle:{
                display:'none'
            }
        }
    }

    toggleFullText = ()=>{
        //Toggle the display state of the full text
        this.setState({
            fullTextToggle:!this.state.fullTextToggle,
            textFullStyle: {
                display: this.state.fullTextToggle ? 'none' : 'block'
            }
        })
    }

    async componentWillMount() {
        //Set the image node of the component
        if (this.props.pictures) {
            for (let item of this.props.pictures) {
                await import(`../assets/img/${item}`).then((image) => {
                    let temp = this.state.images;
                    temp.push((<img src={image} />));
                    console.log(temp)
                    this.setState({
                        images: temp
                    })
                });
            }

        }
    }

    render() {
        return (
            <div className='full-text-display-no-fullscreen-grid-container' style={{
                ...this.props.style, color: 'black',
                height: '85vh',
                position: 'relative',
                top: 0,
            }}>
                <div style={{backgroundColor: 'rgb(246,246,246)', margin: 0,display:'flex',
                flexDirection:'column'}}>
                    <h2 style={{ marginTop: '30px' }}> <img src={this.props.logo} style={{ height: '64px', width: '64px',
                        display: 'inline-block',margin:'20px' }} />{this.props.title}</h2>
                    <p style={{ fontSize: '1.5rem',margin:'0px 20px'}}>{this.props.textChopped}</p>
                    <div style={{ ...this.state.textFullStyle, transition: 'all 2s ease-out'}}>
                        <p style={{
                        fontSize: '1.5rem', margin: '0px 20px',
                        transition: 'all 2s ease-out'
                    }}>{this.props.textFull}</p>
                    </div>
                    <button style={{ backgroundColor: 'transparent', 'color': 'rgb(37,37,37)',
                        borderWidth: '2px',borderRadius:'8px', borderColor: 'rgb(37,37,37)',
                        alignSelf:'center',margin:'50px',width:'30%',
                        fontSize:'2rem'}} onClick={this.toggleFullText}>Vezi mai multe</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(45,132,67,0.45)'}}>
                    {this.state.images} {/* The image node */}
                </div>
            </div>
        );
    }
}