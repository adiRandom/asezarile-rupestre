import React from 'react'
import * as background from '../assets/img/background_main.png';
import Navbar from './Navbar'
import InfoDisplay from './InfoDisplay';

export default class Info extends React.Component{

render(){
    return (
        <div style={{backgroundImage:`url(${background})`,height:'100vh',overflowX:'hidden',backgroundSize:'cover'}}>
            <Navbar/>
            <InfoDisplay type={this.props.match.params.id} />
        </div>
        )
    }
}