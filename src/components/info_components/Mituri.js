import React from 'react';
import * as Legends from '../../data/legends/legend-0'
import Carousel from '../Carousel';
import FullTextDisplay from '../FullTextDisplay';



export default class Mituri extends React.Component{

    constructor(props){
        super(props);
        this.data = Legends.Legends.content;
        this.state = {
            fullText:this.data[0].textFull,
            picture: this.data[0].picture,
            element: (<React.Fragment>
                <Carousel data={this.data} changeFullText={this.updateFullText} />
            </React.Fragment>)
        }
    }


    updateFullText = (indice)=>{
        this.setState({
            fullText:this.data[indice].textFull,
            picture:this.data[indice].picture
        },()=>this.setState({
            element: (<React.Fragment>
                <Carousel data={this.data} changeFullText={this.updateFullText} />
                <FullTextDisplay text={this.state.fullText} picture={this.state.picture}
                        close={this.close} />
            </React.Fragment>)
        }));
        
    }

    close = ()=>{
        this.setState({
            element: (<React.Fragment>
                <Carousel data={this.data} changeFullText={this.updateFullText} />
            </React.Fragment>)
        })
    }

    render(){
        return this.state.element;
    }
}