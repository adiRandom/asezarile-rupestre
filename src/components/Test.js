import React from 'react';
import "../assets/stylesheets/test.css";
import Navbar from './Navbar';
import Circle from "./Circle";
import * as backButton from "../assets/icons/back-button.svg"

export default class Test extends React.Component {

    constructor() {
        super();
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;

        this.state = {
            isFront: true,
            title: ""
        }
    }


    handle = (title) => {
        this.setState({
            isFront: false,
            title: title
        })
    }

    back(){
        this.setState({
            isFront:true
        })
    }


    render() {
        return (

            <React.Fragment>
                <Navbar color="rgb(44, 60, 76)" />

                <div id="test-container" >
                    <div id="test-front" style={{
                        transform: `rotateY(${this.state.isFront ? "0" : "180deg"})`
                    }}>

                        <div id="spidergraph">
                            <svg id="line-svg">
                                <line className="line" x1={this.width / 2} y1={this.height / 2} x2={this.width / 2 - 200} y2={this.height / 2 - 100}></line>
                                <line className="line" x1={this.width / 2} y1={this.height / 2} x2={this.width / 2 - 200} y2={this.height / 2 + 100}></line>
                                <line className="line" x1={this.width / 2} y1={this.height / 2} x2={this.width / 2 + 200} y2={this.height / 2 - 150}></line>
                                <line className="line" x1={this.width / 2} y1={this.height / 2} x2={this.width / 2 + 200} y2={this.height / 2}></line>
                                <line className="line" x1={this.width / 2} y1={this.height / 2} x2={this.width / 2 + 200} y2={this.height / 2 + 150}></line>
                                <line className="line" x1={this.width / 2 + 200} y1={this.height / 2} x2={this.width / 2 + 350} y2={this.height / 2 - 70}></line>
                                <line className="line" x1={this.width / 2 + 200} y1={this.height / 2} x2={this.width / 2 + 350} y2={this.height / 2 + 70}></line>
                                <line className="line" x1={this.width / 2 + 200} y1={this.height / 2 + 150} x2={this.width / 2 + 80} y2={this.height / 2 + 260}></line>
                                <line className="line" x1={this.width / 2 + 200} y1={this.height / 2 + 150} x2={this.width / 2 + 200} y2={this.height / 2 + 260}></line>
                                <line className="line" x1={this.width / 2 + 200} y1={this.height / 2 + 150} x2={this.width / 2 + 320} y2={this.height / 2 + 260}></line>
                                <line className="line" x1={this.width / 2 - 200} y1={this.height / 2 - 100} x2={this.width / 2 - 300} y2={this.height / 2 - 170}></line>
                                <line className="line" x1={this.width / 2 - 200} y1={this.height / 2 - 100} x2={this.width / 2 - 300} y2={this.height / 2 - 30}></line>
                                <line className="line" x1={this.width / 2 - 200} y1={this.height / 2 + 100} x2={this.width / 2 - 320} y2={this.height / 2 + 260}></line>
                                <line className="line" x1={this.width / 2 - 200} y1={this.height / 2 + 100} x2={this.width / 2 - 200} y2={this.height / 2 + 260}></line>
                                <line className="line" x1={this.width / 2 - 200} y1={this.height / 2 + 100} x2={this.width / 2 - 80} y2={this.height / 2 + 260}></line>                        </svg>
                            <Circle className="circle" cx={this.width / 2} cy={this.height / 2}
                                fill="cornflowerblue" r="50">Modalități de evaluare</Circle>
                            <Circle onClick={() => this.handle("Proiecte și concursuri școlare")} className="circle" cx={this.width / 2 - 200} cy={this.height / 2 - 100}
                                fill="cornflowerblue" r="50">Proiecte și concursuri școlare</Circle>
                            <Circle className="circle" cx={this.width / 2 - 300} cy={this.height / 2 - 170}
                                fill="cornflowerblue" r="50">Euroscola</Circle>
                            <Circle className="circle" cx={this.width / 2 - 300} cy={this.height / 2 - 30}
                                fill="cornflowerblue" r="50">Istorie și societate în dimensiune virtuala</Circle>
                            <Circle className="circle" cx={this.width / 2 - 200} cy={this.height / 2 + 100}
                                fill="cornflowerblue" r="50">Promovare</Circle>
                            <Circle className="circle" cx={this.width / 2 - 320} cy={this.height / 2 + 260}
                                fill="cornflowerblue" r="50">Revisă</Circle>
                            <Circle className="circle" cx={this.width / 2 - 200} cy={this.height / 2 + 260}
                                fill="cornflowerblue" r="50">Articole în presa locala</Circle>
                            <Circle className="circle" cx={this.width / 2 - 80} cy={this.height / 2 + 260}
                                fill="cornflowerblue" r="50">Emisiune TV locală</Circle>
                            <Circle className="circle" cx={this.width / 2 + 200} cy={this.height / 2 - 150}
                                fill="cornflowerblue" r="50">Quiz</Circle>
                            <Circle className="circle" cx={this.width / 2 + 200} cy={this.height / 2}
                                fill="cornflowerblue" r="50">Investigație</Circle>
                            <Circle className="circle" cx={this.width / 2 + 350} cy={this.height / 2 - 70}
                                fill="cornflowerblue" r="50">Mărturii orale</Circle>
                            <Circle className="circle" cx={this.width / 2 + 350} cy={this.height / 2 + 70}
                                fill="cornflowerblue" r="50">Portofolii</Circle>
                            <Circle className="circle" cx={this.width / 2 + 200} cy={this.height / 2 + 150}
                                fill="cornflowerblue" r="50">Reprezentări grafice</Circle>
                            <Circle className="circle" cx={this.width / 2 + 80} cy={this.height / 2 + 260}
                                fill="cornflowerblue" r="50">Flyere</Circle>
                            <Circle className="circle" cx={this.width / 2 + 200} cy={this.height / 2 + 260}
                                fill="cornflowerblue" r="50">Desene</Circle>
                            <Circle className="circle" cx={this.width / 2 + 320} cy={this.height / 2 + 260}
                                fill="cornflowerblue" r="50">Postere</Circle>
                        </div>
                    </div>
                    
                    <div id="test-back" style={{
                        transform: `rotateY(${!this.state.isFront ? "0" : "180deg"})`
                    }}>
                        <div onClick={this.back} id="back-button-container">
                            <img id="back-button" src={backButton} alt="back button" />
                        </div>
                        <main id="test-back-container">
                            <h2>{this.state.title}</h2>
                            <hr id="test-heading-hr"></hr>
                            {this.state.backContent}
                        </main>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}