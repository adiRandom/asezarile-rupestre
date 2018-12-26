import React from 'react'
import * as BibliographyFile from '../data/bibliography.json';
import '../assets/stylesheets/bibliography.css'
import * as background from '../assets/graphics/scrollBackground.jpg'
import { CSSTransitionGroup } from "react-transition-group";

class Bibliography extends React.Component {

    constructor(props) {
        super(props);
        this.credits = BibliographyFile.titles.map((value, index) => (<li className="list-item" key={index}
            style={{ listStyle: 'khmer', 
            fontSize: '3rem',
            marginBottom:'10vh'}}>{value}</li>)
        )
    }

    render() {
        return (
            <div style={{ display: 'flex', overflowY: 'hidden',
                backgroundImage:`url(${background})`}}>
                <CSSTransitionGroup
                    transitionName="credits"
                    transitionAppear={true}
                    transitionAppearTimeout={13000}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <ul style={{marginLeft:'2vw'}}>
                        {this.credits}
                    </ul>
                </CSSTransitionGroup>
            </div>
        );
    }
}

export default Bibliography;