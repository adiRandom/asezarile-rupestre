import React from 'react';
import '../assets/stylesheets/full-text-display.css'
import Slideshow from './Slideshow'


export default class FullTextDisplayNoFullscreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            map: null,
            firstHalf: this.props.text.slice(0, this.props.text.length / 2),
            secondHalf: this.props.text.slice(this.props.text.length / 2)
        }
        this.containerRef = React.createRef();
    }

    componentWillMount() {
        //Set the image node of the component
        if (this.props.pictures) {
            //Add a slideshow
            this.element = (<div id='image-container' style={{ gridRow: '2/3', textAlign: 'center' }}>
                <Slideshow images={this.props.pictures} />
            </div>)
            this.setState({
                image: this.element
            });
        }
        else if (this.props.picture)
            //Create the image
            import(`../assets/img/${this.props.picture}`).then((picture) => {
                this.element = (<div id='image-container' style={{ gridRow: '2/3', textAlign: 'center' }}>
                    <img src={picture} style={{ maxHeight: '95%' }} />
                </div>)
                this.setState({
                    image: this.element
                });
            })


        //Import the map image if present

        if (this.props.map) {
            import(`../assets/img/${this.props.map}`).then((map) => {
                this.element = (
                <div style={{display:'flex',justifyContent:'center',height:'50vh'}}>
                    <img src={map} style={{ maxHeight: '95%', marginBottom:'100px'}} />
                </div>)
                this.setState({
                    map: this.element
                })
            })
        }
    }
    render() {
        console.log(this.state)

        if (this.state.secondHalf.length >= 1)
            return (
                <div className='full-text-display-grid-container' style={{
                    ...this.props.style, color: 'white  ',
                    height: '85vh',
                    position: 'relative',
                    top: 0,
                    margin: '0px 25vw'
                }} ref={this.containerRef}>
                    {this.state.image} {/* The image node */}
                    <div id='text-container' style={{ gridRow: '3/4' }}>
                        <div className='card'>
                            <p style={{ fontSize: '2rem' }}>{this.state.firstHalf}</p>
                        </div>
                        {this.state.map}
                        <div className='card'>
                            <p style={{ fontSize: '2rem' }}>{this.state.secondHalf}</p>
                        </div>
                    </div>
                </div>
            );
        else
            return (
                <div className='full-text-display-grid-container' style={{
                    ...this.props.style, color: 'white',
                    height: '85vh',
                    position: 'relative',
                    top: 0,
                    margin: '0px 25vw'
                }} ref={this.containerRef}>
                    {this.state.image} {/* The image node */}
                    <div id='text-container' style={{ gridRow: '3/4' }}>
                        <div className='card'>
                            <p style={{ fontSize: '2rem' }}>{this.state.firstHalf}</p>
                        </div>
                        {this.state.map}
                    </div>
                </div>
            );
    }
}