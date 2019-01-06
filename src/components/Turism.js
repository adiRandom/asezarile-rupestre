import React from 'react';
import * as videoSrc from '../assets/video/1.mp4';

export default class Turism extends React.Component {

    constructor() {
        super();
        this.state = {
            videoStyle: {
                height: '87vh',
                width:'100%',
                backgroundColor: 'rgba(0,0,0,0)'
            }
        }
        this.ref = React.createRef();
    }

    onPlay = () => {
        this.setState({
            videoStyle: {
                height: '87vh',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.7)'
            }
        })
    }

    onPause = () => {
        this.setState({
            videoStyle: {
                height: '87vh',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0)'
            }
        })
    }

    onClick = ()=>{
        if(this.ref.current.paused)
            this.ref.current.play();
        else
            this.ref.current.pause();
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', height: '87vh' }}>
                <video style={this.state.videoStyle} src={videoSrc} onPlay={this.onPlay}
                    onPause={this.onPause} controls={false} ref={this.ref}
                    onClick={this.onClick}>
                </video>
            </div>
        )
    }
}