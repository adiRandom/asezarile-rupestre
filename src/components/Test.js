import React from 'react';
import "../assets/stylesheets/test.css";
import Navbar from './Navbar';
import Circle from "./Circle";
import * as backButton from "../assets/icons/back-button.svg"
import * as article from "../assets/img/article.png"
import * as tvShow from "../assets/img/tv-show.jpeg"
import * as magazine from "../assets/img/revista.PNG"
import * as flayer1 from "../assets/img/flayer1.png"
import * as drawing from "../assets/img/drawing.jpg"
import * as banner from "../assets/img/afis muzeu.jpg"
import quiz from "../data/quiz.json"

export default class Test extends React.Component {

    constructor() {
        super();
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;

        let answers = [];
        for (let question of quiz.questions) {
            answers.push(-1);
        }

        this.state = {
            isFront: true,
            title: "",
            backContent: null,
            score: 0,
            showScore: false,
            answers: answers
        }
    }


    handle = (title) => {
        this.setState({
            isFront: false,
            title: title
        })

        switch (title) {
            case "Articole în presa locala": this.setState({
                backContent: (
                    <img id="article" src={article} alt="article" />
                )
            }); break;
            case "Emisiune TV locală": this.setState({
                backContent: (
                    <img id="tv-show" src={tvShow} alt="tv-show" />
                )
            }); break;
            case "Revisă": this.setState({
                backContent: (
                    <img id="magazine" src={magazine} alt="magazine" />
                )
            }); break;
            case "Flyere": this.setState({
                backContent: (
                    <img id="flayer1" src={flayer1} alt="flayer1" />
                )
            }); break;
            case "Desene": this.setState({
                backContent: (
                    <img id="drawing" src={drawing} alt="drawing" />
                )
            }); break;
            case "Postere": this.setState({
                backContent: (
                    <img id="banner" src={banner} alt="banner" />
                )
            }); break;
            case "Quiz": this.setState((prev)=>({
                backContent: (<form id="quiz" onSubmit={this.checkQuiz}>
                    {quiz.questions.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <h3 className="quiz-header">{item.question}</h3>
                                {item.answers.map((answer, _index) => {
                                    return (
                                        <span key={_index}>
                                            <input
                                                onChange={event => this.update(event, index)}
                                                value={_index}
                                                checked={prev.answers[index] === _index.toString()}
                                                type="radio"
                                                name={`radio-group-${index}`}
                                            />{" "}
                                            {answer}
                                        </span>
                                    );
                                })}
                            </React.Fragment>
                        )
                    })}
                    <input id="quiz-submit" type="submit" value="Verifică" />
                    <h4 id="quiz-score" style={{
                        visibility: prev.showScore ? "visible" : "hidden"
                    }}>{`Felicitari! Ai optinut ${prev.score}/${quiz.questions.length} răspunsuri corecte!`} </h4>
                </form>)
            })); break;
            default: break;
        }
    }

    update = (e, i) => {
        const answers = this.state.answers;
        answers[i] = e.target.value;

        this.setState((prev)=>({
            answers: answers,
            //Rerender the form
            backContent: (<form id="quiz" onSubmit={this.checkQuiz}>
                {quiz.questions.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <h3 className="quiz-header">{item.question}</h3>
                            {item.answers.map((answer, _index) => {
                                return (
                                    <span key={_index}>
                                        <input
                                            onChange={event => this.update(event, index)}
                                            value={_index}
                                            checked={prev.answers[index] === _index.toString()}
                                            type="radio"
                                            name={`radio-group-${index}`}
                                        />{" "}
                                        {answer}
                                    </span>
                                );
                            })}
                        </React.Fragment>
                    )
                })}
                <input id="quiz-submit" type="submit" value="Verifică" />
                <h4 id="quiz-score" style={{
                    visibility: prev.showScore ? "visible" : "hidden"
                }}>{`Felicitari! Ai optinut ${prev.score}/${quiz.questions.length} răspunsuri corecte!`} </h4>
            </form>)
        }))
    }

    checkQuiz = (e)=> { 
        let score = 0;
        for(let i = 0;i<this.state.answers.length;i++)
            if(this.state.answers[i] === quiz.questions[i].correctAnswer.toString())
                score++;
        
        this.setState((prev)=>({
            showScore:true,
            score:score,
            //Rerender the form
            backContent: (<form id="quiz" onSubmit={this.checkQuiz}>
                {quiz.questions.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <h3 className="quiz-header">{item.question}</h3>
                            {item.answers.map((answer, _index) => {
                                return (
                                    <span key={_index}>
                                        <input
                                            onChange={event => this.update(event, index)}
                                            value={_index}
                                            checked={prev.answers[index] === _index.toString()}
                                            type="radio"
                                            name={`radio-group-${index}`}
                                        />{" "}
                                        {answer}
                                    </span>
                                );
                            })}
                        </React.Fragment>
                    )
                })}
                <input id="quiz-submit" type="submit" value="Verifică" />
                <h4 id="quiz-score"
                >{`Felicitari! Ai optinut ${score}/${quiz.questions.length} răspunsuri corecte!`} </h4>
            </form>)
        }))
        e.preventDefault();
    }

    back = () => {
        this.setState({
            isFront: true
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
                            <Circle className="circle" cx={this.width / 2 - 200} cy={this.height / 2 - 100}
                                fill="cornflowerblue" r="50">Proiecte și concursuri școlare</Circle>
                            <Circle className="circle" cx={this.width / 2 - 300} cy={this.height / 2 - 170}
                                fill="cornflowerblue" r="50">Euroscola</Circle>
                            <Circle className="circle" cx={this.width / 2 - 300} cy={this.height / 2 - 30}
                                fill="cornflowerblue" r="50">Istorie și societate în dimensiune virtuala</Circle>
                            <Circle className="circle" cx={this.width / 2 - 200} cy={this.height / 2 + 100}
                                fill="cornflowerblue" r="50">Promovare</Circle>
                            <Circle onClick={() => this.handle("Revistă")} className="circle" cx={this.width / 2 - 320} cy={this.height / 2 + 260}
                                fill="cornflowerblue" r="50">Revistă</Circle>
                            <Circle onClick={() => this.handle("Articole în presa locala")} className="circle" cx={this.width / 2 - 200} cy={this.height / 2 + 260}
                                fill="cornflowerblue" r="50">Articole în presa locala</Circle>
                            <Circle onClick={() => this.handle("Emisiune TV locală")} className="circle" cx={this.width / 2 - 80} cy={this.height / 2 + 260}
                                fill="cornflowerblue" r="50">Emisiune TV locală</Circle>
                            <Circle onClick={() => this.handle("Quiz")} className="circle" cx={this.width / 2 + 200} cy={this.height / 2 - 150}
                                fill="cornflowerblue" r="50">Quiz</Circle>
                            <Circle className="circle" cx={this.width / 2 + 200} cy={this.height / 2}
                                fill="cornflowerblue" r="50">Investigație</Circle>
                            <Circle className="circle" cx={this.width / 2 + 350} cy={this.height / 2 - 70}
                                fill="cornflowerblue" r="50">Mărturii orale</Circle>
                            <Circle className="circle" cx={this.width / 2 + 350} cy={this.height / 2 + 70}
                                fill="cornflowerblue" r="50">Portofolii</Circle>
                            <Circle className="circle" cx={this.width / 2 + 200} cy={this.height / 2 + 150}
                                fill="cornflowerblue" r="50">Reprezentări grafice</Circle>
                            <Circle onClick={() => this.handle("Flyere")} className="circle" cx={this.width / 2 + 80} cy={this.height / 2 + 260}
                                fill="cornflowerblue" r="50">Flyere</Circle>
                            <Circle onClick={() => this.handle("Desene")} className="circle" cx={this.width / 2 + 200} cy={this.height / 2 + 260}
                                fill="cornflowerblue" r="50">Desene</Circle>
                            <Circle onClick={() => this.handle("Postere")} className="circle" cx={this.width / 2 + 320} cy={this.height / 2 + 260}
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