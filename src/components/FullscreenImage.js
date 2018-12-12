import React from "react"
import {CSSTransitionGroup} from "react-transition-group";
import * as closeIcon from '../assets/graphics/close-circle-512.png'

export default class FullscreenImage extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            imageElement : null
        }
    }

    componentWillMount(){
        const imageName = this.props.images[this.props.index];
        const exension = imageName.substring(imageName.length - 4, imageName.length);
        const name = imageName.substring(0, imageName.length - 4) + "-full" + exension;

        import(`../assets/img/${name}`).then((image)=>{
            this.setState({
                imageElement : (
                <div>
                    <img src = {image} style={{height:'86vh',marginTop:'7vh'}} />
                </div>)
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
            background:'rgba(0,0,0,0.7)',
            top:0,left:0,
            zIndex:1}}>
                    {this.state.imageElement}
                <div id='close-icon'>
                    <img alt='close-icon' src={closeIcon} onClick={this.close} />
                </div>
            </div>
        );
    }

    
}