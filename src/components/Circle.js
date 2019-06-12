import React from 'react'

export default class Circle extends React.Component{
    render(){
        return(<div id={this.props.id} className={this.props.className} onClick={this.props.onClick} style={{
            position:"absolute",
            width:this.props.r * 2,
            height:this.props.r * 2,
            backgroundColor:this.props.fill,
            top:this.props.cy - this.props.r,
            left:this.props.cx - this.props.r,
            borderRadius:49,
            textAlign:"center",
            verticalAlign:"center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:'center'
        }}>{this.props.children}</div>)
    }
}