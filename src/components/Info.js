import React from 'react'
import Carousel from './Carousel'
import * as img from "../assets/img/back1.png"

export default class Info extends React.Component{


    scrollHandling(e) {

        console.log("hey");
        console.log(e);

    }

render(){

    return (
        <div style={{backgroundColor:"red"}}>
            <Carousel data={[{ text: "Demo", photo: img }, { text: "Demo2", photo: img }, { text: "Demo3", photo: img }]}/>
        </div>
        )
    }
}