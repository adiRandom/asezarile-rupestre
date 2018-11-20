import React from 'react';
import Carousel from './Carousel';
import FullTextDisplay from './FullTextDisplay';


export default class InfoDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.data = this.props.data;
        console.log(this.data);

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
            title:this.data[0].title,
            element: null,
            logo:null
        }
    }

    //A function that is passed donw to the Carousel to call when the FullTextDisplay node should get displayed
    showFullText = (indice) => {
        //Fetch the curent displaying information
        //And add it to the state for the FullTextDisplay node to take
        this.setState({
            fullText: this.data[indice].textFull,
            title:this.data[indice].title
        }, () => this.setState({
            element: (<React.Fragment>
                <Carousel color={this.props.color} logo={this.state.logo} data={this.data} showFullText={this.showFullText} />
                <FullTextDisplay title={this.state.title} logo={this.state.logo} color={this.props.color} text={this.state.fullText}
                    close={this.closeFullText} />
            </React.Fragment>)
        }));

    }

    closeFullText = () => {
        this.setState({
            element: (<React.Fragment>
                <Carousel color={this.props.color} logo={this.state.logo} data={this.data} showFullText={this.showFullText} />
            </React.Fragment>)
        })
    }

    componentWillMount(){
        import(`../assets/icons/${this.props.logo}`).then((logo)=>{
            this.setState({
                logo:logo
            },()=>this.setState({
                element: (<React.Fragment>
                    <Carousel color={this.props.color} logo={this.state.logo} data={this.data} showFullText={this.showFullText} />
                </React.Fragment>)
            }))
        })
    }

    render() {
        return this.state.element;
    }
}