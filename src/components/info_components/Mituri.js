import React from 'react';
import * as Legends from '../../data/legends/legend-0'
import Carousel from '../Carousel'
import * as img from '../../assets/img/22136998_1491150584311900_691524416981770128_o.jpg';
import FullTextDisplay from '../FullTextDisplay';
import ReactDOM from 'react-dom';



export default class Mituri extends React.Component{

    constructor(props){
        super(props);
        this.data = Legends.Legends.content;
        for(var i = 0;i<this.data.length;i++)
            this.data[i].picture = img;
        this.state = {
            fullText:this.data[0].textFull
        }

        this.myRef = React.createRef();
    }

    updateFullText = (indice)=>{
        this.setState({
            fullText:this.data[indice].textFull
        });
        const myDomNode = ReactDOM.findDOMNode(this.myRef.current);
        myDomNode.scrollIntoView();
    }

    render(){
        return(
        <React.Fragment>
            <Carousel data = {this.data} changeFullText={this.updateFullText} />
            <FullTextDisplay style={{ marginTop: "10vh" }} text={this.state.fullText} ref={this.myRef}/>
        </React.Fragment>
        );
    }
}