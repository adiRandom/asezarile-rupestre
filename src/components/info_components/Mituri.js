import React from 'react';
import * as Legends0 from '../../data/legends/legend-0'
import * as Legends1 from '../../data/legends/legend-1'
import * as Legends2 from '../../data/legends/legend-2'
import Carousel from '../Carousel'
import * as img from '../../assets/img/22136998_1491150584311900_691524416981770128_o.jpg';

export default class Mituri extends React.Component{

    constructor(props){
        super(props);
        this.data0 = Legends0.Legends.content;
        for(var i = 0;i<this.data0.length;i++)
            this.data0[i].picture = img;
        this.data1 = Legends1.Legends.content;
        for(var i = 0;i<this.data1.length;i++)
            this.data1[i].picture = img;
        this.data2 = Legends2.Legends.content;
        for(var i = 0;i<this.data2.length;i++)
            this.data2[i].picture = img;
    }

    render(){
        return(
        <React.Fragment>
            <Carousel data = {this.data0} />
            <Carousel data = {this.data1} style={{marginTop:"10vh"}}/>
            <Carousel data={this.data2} style={{ marginTop: "10vh" }} />
        </React.Fragment>
        );
    }
}