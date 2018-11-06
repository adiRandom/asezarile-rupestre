import React from 'react';
import Carousel from './Carousel';
import FullTextDisplay from './FullTextDisplay';


export default class InfoDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.data = this.props.data;
        
        //Map \n to html break
        if (!Array.isArray(this.data[0].textChopped)) { //Check if the data hasn't been previously mapped already
            for (let i = 0; i < this.data.length; i++) {
                this.data[i].textChopped = this.data[i].textChopped.split('\r\n').map((item, key) => {
                    return <span key={key}>{item}<br /></span>
                });
                if (this.data[i].textFull)
                    this.data[i].textFull = this.data[i].textFull.split('\r\n').map((item, key) => {
                        return <span key={key}>{item}<br /></span>
                    })
            }
        }
        this.state = {
            fullText: this.data[0].textFull,
            picture: this.data[0].picture,
            element: (<React.Fragment>
                <Carousel data={this.data} showFullText={this.showFullText} />
            </React.Fragment>)
        }
    }


    showFullText = (indice) => {
        this.setState({
            fullText: this.data[indice].textFull,
            picture: this.data[indice].picture
        }, () => this.setState({
            element: (<React.Fragment>
                <Carousel data={this.data} showFullText={this.showFullText} />
                <FullTextDisplay text={this.state.fullText} picture={this.state.picture}
                    close={this.closeFullText} />
            </React.Fragment>)
        }));

    }

    closeFullText = () => {
        this.setState({
            element: (<React.Fragment>
                <Carousel data={this.data} showFullText={this.showFullText} />
            </React.Fragment>)
        })
    }

    render() {
        return this.state.element;
    }
}