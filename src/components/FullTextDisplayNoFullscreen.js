import React from 'react';
import '../assets/stylesheets/full-text-display.css'
import Slideshow from './Slideshow'


export default class FullTextDisplayNoFullscreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            element: null,
        }
        this.containerRef = React.createRef();
    }

    componentWillMount() {
        //Set the image node of the component
        if(this.props.pictures){
            //Add a slideshow
            this.element = (<div id='image-container' style={{ gridRow: '2/3', textAlign: 'center' }}>
                <Slideshow images={this.props.pictures}/>
            </div>)
            this.setState({
                element: this.element
            });
        }
        else if(this.props.picture)
        //Create the image
        import(`../assets/img/${this.props.picture}`).then((picture) => {
            this.element = (<div id='image-container' style={{ gridRow: '2/3', textAlign: 'center' }}>
                <img src={picture} style={{ maxHeight: '95%' }} />
            </div>)
            this.setState({
                element: this.element
            });
        })
    }
    render() {
        return (
            <div className='full-text-display-grid-container' style={{
                ...this.props.style, color: 'black',
                height: '85vh',
                position: 'relative',
                top: 0,
                margin:'0px 20px'
            }} ref={this.containerRef}>
                {this.state.element} {/* The image node */}
                <p style={{ fontSize: '2rem', gridRow: '3/4' }}>{this.props.text}</p>
            </div>
        );
    }
}