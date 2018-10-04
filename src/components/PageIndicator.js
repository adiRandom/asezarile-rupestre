import React from 'react';
import PageIndicatorPill from './PageIndicatorPill';

export default class PageIndicator extends React.Component{

    constructor(props){
        super(props);
        let pills = [];
        for(var i = 0;i<props.size;i++) //Create an array of all the pills required to create the page indicator
            if(i == this.props.activeIndice) //Check which of the pills is the active one - active is true
               pills.push(<PageIndicatorPill key={i} active={true}/>);
            else
               pills.push(<PageIndicatorPill key={i} active={false}/>);
        
        this.state = {pills:pills};
    }


    render(){
        return(
            <div id="PageIndicatorContainer">{this.state.pills}</div>);
    }

}