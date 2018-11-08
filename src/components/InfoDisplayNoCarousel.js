import React from 'react';
import FullTextDisplayNoFullscreen from './FullTextDisplayNoFullscreen';


export default class InfoDisplayNoCarousel extends React.Component {

    constructor(props) {
        super(props);
        this.data = this.props.data;
        console.log(props);

        //Map \n to html break
        if (!Array.isArray(this.data[0].textChopped)) { //Check if the data hasn't been previously mapped already
            for (let i = 0; i < this.data.length; i++) {
                if(this.data[i].textChopped)
                    this.data[i].textChopped = this.data[i].textChopped.split('\r\n').map((item, key) => {
                        return <span key={key}>{item}<br /></span>
                    });
                if (this.data[i].textFull)
                    this.data[i].textFull = this.data[i].textFull.split('\r\n').map((item, key) => {
                        return <span key={key}>{item}<br /></span>
                    })
            }
        }

        //Keep the json template - put the text at indice 0 of the array
        this.state = {
            fullText: this.data[0].textFull,
            picture: this.data[0].picture,
        }
    }

    render() {
        return (
            <React.Fragment>
                <FullTextDisplayNoFullscreen text={this.state.fullText} picture={this.state.picture} />
            </React.Fragment>
        )
    }
}