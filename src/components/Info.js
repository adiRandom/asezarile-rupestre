import React from 'react'
import * as background from '../assets/img/background_main.png';
import Navbar from './Navbar'
import InfoDisplay from './InfoDisplay';

export default class Info extends React.Component{

constructor(props){
    super(props);
    this.state={
        element:null
    }
}

componentDidMount(){
    switch(this.props.match.params.id){
        case 'legende': import('../data/legends.json').then((data)=>{
            this.setState({
                element:(<InfoDisplay data={data.content} />)
            })
        });break;
        case 'istorie': import('../data/history.json').then((data) => {
            this.setState({
                element: (<InfoDisplay data={data.content} />)
            })
        }); break;
    }
}

componentDidUpdate(prevProps){
    if (this.props.match.params.id !== prevProps.match.params.id)
        switch (this.props.match.params.id) {
            case 'legende': import('../data/legends.json').then((data) => {
                this.setState({
                    element: (<InfoDisplay data={data.content} />)
                })
            });
            break;
            case 'istorie': import('../data/history.json').then((data) => {
                this.setState({
                    element: (<InfoDisplay data={data.content} />)
                })
            }); break;
        default: break;
        }
}

render(){
    return (
        <div style={{backgroundImage:`url(${background})`,height:'100vh',overflowX:'hidden',backgroundSize:'cover'}}>
            <Navbar/>
            {this.state.element}
        </div>
        )
    }
}