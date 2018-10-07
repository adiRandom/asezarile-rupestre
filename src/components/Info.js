import React from 'react'
import * as background from '../assets/img/background_main.png';
import Navbar from './Navbar'
import Mituri from './info_components/Mituri'

export default class Info extends React.Component{

constructor(props){
    super(props);
    switch (props.match.params.id){
        case 'mituri' : this.content = (<Mituri/>); break;
        default : break;
    }
}

render(){
    return (
        <div style={{backgroundImage:`url(${background})`,height:'100vh',overflowX:'hidden',backgroundSize:'cover'}}>
            <Navbar/>
            {this.content}
        </div>
        )
    }
}