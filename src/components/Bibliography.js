import React from 'react';
// import { Carousel } from '3d-react-carousal';
import * as data from '../data/bibliography.json'
import Book from './Book'
/* import * as book from '../assets/icons/book-icon-yellow.png'
import '../assets/stylesheets/bibliography.css' */

export default class Bibliography extends React.Component {

    render(){
        return(
            <Book data={data.titles}/>
        );
    }
}