import React from 'react';
import PageIndicatorPill from './PageIndicatorPill';

export default class PageIndicator extends React.Component{

    constructor(props){
        super(props);
        let pills = [];
        for (var i = 0; i < props.size; i++)  //Create an array of all the pills required to create the page indicator
            pills.push(<PageIndicatorPill key={i} active={props.activeIndice === i} />);
        this.state = {pills:pills};
    }

    componentWillReceiveProps(nextProps){
        let pills = [];
        for (var i = 0; i < nextProps.size; i++) //Update the indicator
                pills.push(<PageIndicatorPill key={i} active={nextProps.activeIndice === i} />);
        this.setState({ pills: pills });
    }

    render(){
        return(
            <div id="PageIndicatorContainer" style={this.props.style}>{this.state.pills}</div>);
    }

}