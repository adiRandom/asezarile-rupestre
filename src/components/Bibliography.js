import React from 'react';
import { Carousel } from '3d-react-carousal';
import * as data from '../data/bibliography.json'
import * as book from '../assets/icons/book-icon-yellow.png'
import '../assets/stylesheets/bibliography.css'

export default class Bibliography extends React.Component {
    constructor(props) {
        super(props);
        this.titles = data.titles.map((item, key) => {
            return (
                <div key={key} style={{ position: 'relative', textAlign: 'center' }}>
                    <img src={book} style={{width:'512px',height:'512px'}} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', 
                        transform: 'translate(-50%, -50%)', color:'White',fontSize:'2rem' }}>{item}</div>
                </div>
            );
        })
    }

    render(){
        return(
            <Carousel style={{boxShadow:'none'}} slides={this.titles}/>
        );
    }
}