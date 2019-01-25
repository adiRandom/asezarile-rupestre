import React from 'react'
import '../assets/stylesheets/bibliography.css'
import * as background from '../assets/graphics/scrollBackground.jpg'
import { CSSTransitionGroup } from 'react-transition-group'

class Bibliography extends React.Component {

    constructor(props) {
        super(props);
        this.credits = this.props.titles.map((value, index) => (<li className="list-item" key={index}
            style={{
                listStyle: 'khmer',
                fontSize: '1.2rem',
                marginBottom: '10vh',
                float:'none'
            }}>{value}</li>)
        )
    }

    render() {
        return (
            <div style={{
                display: 'flex', overflowY: 'hidden',
                backgroundImage: `url(${background})`,
            }}>
                <CSSTransitionGroup
                    transitionName="credits"
                    transitionAppear={true}
                    transitionAppearTimeout={10500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div style={{marginTop:'10vh'}}>
                        <ul style={{ marginLeft: '2vw'}}>
                            {this.credits}
                        </ul>
                    </div>
                </CSSTransitionGroup> 
            </div>
        );
    }
}

export default Bibliography;