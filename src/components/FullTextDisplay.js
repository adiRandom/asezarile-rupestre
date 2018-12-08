import React from 'react';
import '../assets/stylesheets/full-text-display.css'
import * as closeIcon from '../assets/graphics/close-circle-512.png'
import { CSSTransitionGroup } from "react-transition-group"


export default class FullTextDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images:[],
            style:{},
            logo: null
        }
        this.containerRef = React.createRef();
    }

    close = ()=>{ //A function that initiates the closing animation
        this.setState({
            style:{
                transition:'all 1s ease-in'
            }
        },()=>this.setState({
            style: {
                transition: 'all 1s ease-in',
                transform:'translateY(-200vh)'
            }
        },()=>setTimeout(this.props.close,1000)))
    }

    render() {
        return (
            <CSSTransitionGroup
                transitionName="read-more-enter"
                transitionAppear={true}
                transitionAppearTimeout={5000}
                transitionEnter={false}
                transitionLeave={false}>
                <div className='full-text-display-wrapper' style={{ ...this.state.style,width:'100vw' }}>
                    <div id='close-icon'>
                        <img alt='close-icon' src={closeIcon} onClick={this.close} />
                    </div>
                    <div className='full-text-display-grid-container' style={{
                        ...this.props.style, backgroundColor: this.props.color, color: 'black',
                        WebkitBoxShadow: '-7px -7px 22px 0 rgba(97,97,97,0.35) inset',
                        BoxShadow: '-7px -7px 22px 0 rgba(97,97,97,0.35) inset', overflow: 'hidden',
                        height: '100vh',
                        width: '60vw',
                        overflowY: 'scroll',
                        position: 'relative',
                        top: 0
                    }} ref={this.containerRef}>
                    {/* <img src={this.props.logo} style={{gridRow:'2/3',gridColumn:'1/3',marginLeft:'30%',opacity:0.45}}/> */}
                        <h1 style={{gridRow:'1/2',fontFamily:'Bernard MT Condensed',gridColumn:'1/3',marginTop:'10px',fontStyle:'italic',
                                    borderBottom:'black','borderBottomStyle':'solid',borderBottomWidth:'2px'}}>{this.props.title}</h1>
                            <p style={{ fontSize: '1.7rem',fontFamily:'Calibri',backgroundSize:'contain', backgroundImage: `url(${this.props.logo})`, 
                                        gridRow: '2/3', gridColumn: '1/2', marginLeft:'30px',
                                backgroundPositionX: 'center', backgroundPositionY: 'center'}}>{this.props.text}</p>
                    </div>
                </div>
            </CSSTransitionGroup>);
    }
}