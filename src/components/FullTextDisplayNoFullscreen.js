import React from 'react';
import '../assets/stylesheets/full-text-display.css'


export default class FullTextDisplayNoFullscreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            element: null,
        }
        this.containerRef = React.createRef();
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