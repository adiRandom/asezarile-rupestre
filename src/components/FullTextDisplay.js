import React from 'react';
import '../assets/stylesheets/full-text-display.css'
import * as closeIcon from '../assets/graphics/close-circle-512.png'
import ReactDOM from 'react-dom';



export default class FullTextDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            element: null
        }
        this.containerRef = React.createRef();
    }

    componentWillMount() {
        //Create the node that displays the full text
        import(`../assets/img/${this.props.picture}`).then((picture) => {
            this.element = (<div className='grid-container' style={{
                ...this.props.style, backgroundColor: 'rgba(255, 255, 255,0.80)', color: 'black',
                WebkitBoxShadow: '-7px -7px 22px 0 rgba(97,97,97,0.35) inset',
                BoxShadow: '-7px -7px 22px 0 rgba(97,97,97,0.35) inset', overflow: 'hidden'
            }} ref={this.containerRef}>
                <div id='close-icon' style={{ gridColumn: '4/5', gridRow: '1/2' }}>
                    <img src={closeIcon} onClick={this.props.close} style={{ width: '32px', height: '32px', marginTop: '20px' }} />
                </div>
                <div id='image-container' style={{ gridColumn: '2/3', gridRow: '2/3', alignSelf: 'center' }}>
                    <img src={picture} style={{ display: 'inline-block', maxWidth: '95%' }} />
                </div>
                <p style={{ fontSize: '2rem', gridColumn: '3/4', gridRow: '2/3' }}>{this.props.text}</p>
            </div>);
            this.setState({
                element: this.element
            });
        })
    }
    render() {
        return this.state.element;
    }
}