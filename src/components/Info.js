import React from 'react'
import * as background from '../assets/img/background_main.png';
import Navbar from './Navbar'
import InfoDisplay from './InfoDisplay';

export default class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            element: null
        }
    }

    componentDidMount() {
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
        }
    }

    shouldComponentUpdate(nextProps,nextState) {

        if (this.props.match.params.id !== nextProps.match.params.id && nextProps) {
            switch (nextProps.match.params.id) {
                case 'legende': import('../data/legends.json').then((data) => {
                    this.setState({
                        element:null
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