import React from "react";

export default class Legends extends React.Component{

    constructor(props){
        super(props);
        this.state={
            menuItems:[],
            text:""
        }
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <div id="legends-main-flex-container">
                <div id="legends-menu-bar">

                </div>
            </div>
        )
    }
}