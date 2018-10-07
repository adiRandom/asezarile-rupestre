import React from 'react'
import Carousel from './Carousel'
import * as img from "../assets/img/back1.png"
import * as background from '../assets/img/background_main.png';
import Navbar from './Navbar'

export default class Info extends React.Component{


render(){

    return (
        <div style={{backgroundImage:`url(${background})`,height:'100vh',overflowX:'hidden'}}>
            <Navbar/>
            <Carousel data={[{ title:'Demo title',text: "Demo", photo: img }, { text: "Demo2", photo: img }, { text: "Demo3", photo: img }]}/>
        </div>
        )
    }
}