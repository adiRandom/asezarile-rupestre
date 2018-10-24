import React from 'react';
import * as slideBackground from '../assets/img/slidegreen.png'
import '../assets/stylesheets/full-text-display.css'


export default class FullTextDisplay extends React.Component {
    render() {
        return (
                <div className='grid-container' style={{
                    ...this.props.style, backgroundColor: 'rgba(61, 186, 44,0.35)', color: 'white',
                    WebkitBoxShadow: '-7px -7px 22px 0 rgba(61,142,46,0.35) inset',
                    BoxShadow: '-7px -7px 22px 0 rgba(61,142,46,0.35) inset',overflow:'hidden'
                }}>
                <div id='image-container' style={{gridColumn:'2/3',alignSelf:'center'}}>
                    <img src={slideBackground} style={{display:'inline-block',maxWidth:'95%'}}/>
                </div>
                    <p style={{ fontSize: '2rem', gridColumn:'3/4'}}>{this.props.text}</p>
                </div>
        );
    }
}