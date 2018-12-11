import React from "react"
import {CSSTransitionGroup} from "react-transition-group";
import '../assets/stylesheets/fullscreenImage.css'
import * as closeIcon from '../assets/graphics/close-circle-512.png'

export default class FullscreenImage extends React.component{
    constructor(props){
        super(props);
        this.state = {
            imageElement : null
        }
    }

    componentWillMount(){
        const exension = this.props.name.substring(this.props.name.length - 4,this.props.name.length);
        const name = this.props.name.substring(0,this.props.name.length - 4) + "-full" + exension;

        import(`../assets/img/${name}`).then((image)=>{
            this.setState({
                imageElement : (<img src = {image} />)
            })
        })
    }

    close = () =>{
        this.props.onClose();
    }

    render(){
        return(
            <div style={{height:'100vh',width:'100vw',
            display:'flex',justifyContent:'center',alignContent:'center',
            position:'absolute',
            top:0,left:0}}>
                <CSSTransitionGroup
                    transitionName="make-image-fullscreen"
                    transitionAppear={true}
                    transitionAppearTimeout={5000}
                    transitionEnter={false}
                    transitionLeave={false}>
                    {this.state.imageElement}
                 </CSSTransitionGroup>
                <div id='close-icon'>
                    <img alt='close-icon' src={closeIcon} onClick={this.close} />
                </div>
            </div>
        );
    }

    
}