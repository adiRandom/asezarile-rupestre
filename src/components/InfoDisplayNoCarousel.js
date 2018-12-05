import React from 'react';
import FullTextDisplayNoFullscreen from './FullTextDisplayNoFullscreen';


export default class InfoDisplayNoCarousel extends React.Component {

    constructor(props) {
        super(props);
        this.data = this.props.data;

        //Map \n to html break
        if (!Array.isArray(this.data[0].textFull)) { //Check if the data hasn't been previously mapped already
            for (let i = 0; i < this.data.length; i++) {
                this.data[i].textChopped = this.data[i].textChopped.split('\r\n').map((item, key) => {
                    return <span style={{color:key === 0? 'black':'grey'}} key={key}>{item}<br /></span>
                });
                this.data[i].textFull = this.data[i].textFull.split('\r\n').map((item, key) => {
                    return <span style={{ color:'grey' }} key={key}>{item}<br /></span>
                })
            }
        }

        //Keep the json template - put the text at indice 0 of the array
        this.state = {
            fullText: this.data[0].textFull,
            pictures: this.data[0].pictures,
            textChopped: this.data[0].textChopped,
            title:this.data[0].title,
            logo:null
        }
    }

    componentWillMount(){
        import(`../assets/icons/${this.props.logo}`).then((logo)=>{
            this.setState({
                logo:logo
            })
        })
    }

    render() {

        return (
            <React.Fragment>
                <FullTextDisplayNoFullscreen color={this.props.color} logo={this.state.logo} textChopped={this.state.textChopped} textFull={this.state.fullText}
                    picture={this.state.picture} pictures={this.state.pictures} title={this.state.title} />
            </React.Fragment>
        )
    }
}