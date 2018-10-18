import React from 'react';

export default class FullTextDisplay extends React.Component{
    render(){
        return(
            <div id='full-text-container' style={{...this.props.style,backgroundColor:'white'}}>
                <p style={{fontSize:'2rem'}}>{this.props.text}</p>
            </div>
        );
    }
}