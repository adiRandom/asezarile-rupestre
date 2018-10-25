import React from 'react';
import '../assets/stylesheets/full-text-display.css'
import * as closeIcon from '../assets/graphics/close-circle-512.png'
import { CSSTransitionGroup } from "react-transition-group";


export default class FullTextDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            element: null,
            style:{}
        }
        this.containerRef = React.createRef();
    }

    close = ()=>{
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

    componentWillMount() {
        //Create the node that displays the full text
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
            <CSSTransitionGroup
                transitionName="read-more-enter"
                transitionAppear={true}
                transitionAppearTimeout={5000}
                transitionEnter={false}
                transitionLeave={false}>
                <div className='full-text-display-wrapper' style={{ ...this.state.style }}>
                    <div className='full-text-display-grid-container' style={{
                        ...this.props.style, backgroundColor: 'rgba(255, 255, 255,0.80)', color: 'black',
                        WebkitBoxShadow: '-7px -7px 22px 0 rgba(97,97,97,0.35) inset',
                        BoxShadow: '-7px -7px 22px 0 rgba(97,97,97,0.35) inset', overflow: 'hidden',
                        overflowY: 'scroll',
                        height: '100vh',
                        width: '60vw',
                        position: 'relative',
                        left: '20vw',
                        top: 0
                    }} ref={this.containerRef}>
                        <div id='close-icon'>
                            <img src={closeIcon} onClick={this.close} style={{ maxWidth: '32px', maxHeight: '32px', }} />
                        </div>
                        {this.state.element}
                        <p style={{ fontSize: '2rem', gridRow: '3/4' }}>{this.props.text}</p>
                    </div>
                </div>
            </CSSTransitionGroup>);
    }
}