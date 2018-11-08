import React from 'react'
import * as background from '../assets/img/background_main.png';
import Navbar from './Navbar'
import InfoDisplay from './InfoDisplay';
import InfoDisplayNoCarousel from './InfoDisplayNoCarousel'

export default class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            element: null
        }
    }

    componentDidMount() {
        //Decide upon the information that has to be displayed
        //based on the url
        switch (this.props.match.params.id) {
            case 'legende': import('../data/legends.json').then((data) => {
                this.setState({
                    element: (<InfoDisplay data={data.content} location={this.props.location} />)
                })
            }); break;
            case 'istorie': import('../data/history.json').then((data) => {
                this.setState({
                    element: (<InfoDisplay data={data.content} location={this.props.location} />)
                })
            }); break;
            case 'geografie': import('../data/geography.json').then((data) => {
                this.setState({
                    element: (<InfoDisplayNoCarousel data={data.content} location={this.props.location} />)
                })
            }); break;
            case 'turism': import('../data/turism.json').then((data) => {
                this.setState({
                    element: (<InfoDisplayNoCarousel data={data.content} location={this.props.location} />)
                })
            }); break;
        }
    }

    shouldComponentUpdate(nextProps,nextState) {

        //Check if the location changed and update the displaying node

        if (this.props.match.params.id !== nextProps.match.params.id && nextProps) {
            switch (nextProps.match.params.id) {
                case 'legende': import('../data/legends.json').then((data) => {
                    this.setState({
                        element:null //Mark the element as null to unmount it and remount the new node
                    }, () => this.setState({
                        element: (<InfoDisplay data={data.content} location={this.props.location} />)
                    }))
                }); return true;
                case 'istorie': import('../data/history.json').then((data) => {
                    this.setState({
                        element: null
                    }, () => this.setState({
                        element: (<InfoDisplay data={data.content} location={this.props.location} />)
                    }))
                }); return true;
                case 'geografie': import('../data/geography.json').then((data) => {
                    this.setState({
                        element: null
                    }, () => this.setState({
                        element: (<InfoDisplayNoCarousel data={data.content} location={this.props.location} />)
                    }))
                }); return true;
                case 'turism': import('../data/turism.json').then((data) => {
                    this.setState({
                        element: null
                    }, () => this.setState({
                        element: (<InfoDisplayNoCarousel data={data.content} location={this.props.location} />)
                    }))
                }); return true;
                default: return true;
            }
        }

        return true;
    }

    render() {
        return (
            <div style={{ backgroundImage: `url(${background})`, height: '100vh', overflowX: 'hidden', backgroundSize: 'cover' }}>
                <Navbar />
                {this.state.element}
            </div>
        )
    }
}