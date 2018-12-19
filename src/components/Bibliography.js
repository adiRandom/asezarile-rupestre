import React from 'react'
import * as bibliography from '../data/bibliography.json';
import Slider from 'react-slick'
import '../assets/stylesheets/bibliography.css'
import * as rarrow from '../assets/graphics/rarrow_inactive.png'
import * as larrow from '../assets/graphics/larrow_inactive.png'

function LeftArrow(props){
    let style = {
        width: '23px',
        position:'fixed',
        top:'50%',
        left:'20px',
        height: '38px',
        display: 'inline-block',
        backgroundImage: `url(${larrow})`
    }

    return(<div onClick={props.onClick} style={style}></div>);
}


function RightArrow(props) {
    let style = {
        width: '23px',
        height: '38px',
        top: '50%',
        position: 'fixed',
        right: '30px',
        display: 'inline-block',
        backgroundImage: `url(${rarrow})`
    }

    return (<div onClick={props.onClick} style={style}></div>);
}
export default class Bibliography extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.state = {
            current: 0,
            slides:[]
        }

    }

    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }

    handleSlideChange = (event)=> {
        const current = this.state.current;
        if(event.orientation === 'left'){
            if(current - 1 >= 0)
                this.setState({
                    current : current - 1
                })
            else
                this.setState((prev)=>({
                    current : prev.slides.length - 1
                }))
        }
        else
            if(current + 1 < this.state.slides.length)
                this.setState({
                    current : current + 1
                })
            else
                this.setState({
                    current : 0
                })
    }

    async componentWillMount() {
        for (var i = 0; i < bibliography.entries.length; i++) {
            const bibliographyFile = bibliography;
            await import(`../assets/img/${bibliographyFile.entries[i].image}`).then((image)=>{
                let temp = this.state.slides;
                let slide = (
                    <div>
                    <div id='slide' key={i} style={{
                        display:'grid',
                        gridTemplateColumns:'5% 30% 60% 5%',
                        height:'100%',
                        gridTempalteRows:'5% 90% 5%'
                    }}>

                        <div id='empty' style={{gridColumn:'1/2'}}>{null}</div>
                        <div style={{display:'flex',alignItems:'center',gridRow:'2/3',gridColumn:'2/3'}}>
                            <img src={image} alt='book-cover' style={{maxHeight:'70vh',maxWidth:'95%'}} />
                        </div>
                        <div style={{display:'flex',flexDirection:'column',gridRow:'2/3',gridColumn:'3/4'}}>
                            <p id='title' style={{
                                margin:'50px',
                                marginBottom:'75px',
                                fontSize:'32px',
                                color:'black',
                                alignSelf:'center',
                            }}>{bibliographyFile.entries[i].title}</p>
                            <p id='info' style={{
                                fontSize:'24px',
                                color:'black'
                            }}>{bibliographyFile.entries[i].info}</p>
                        </div>
                        <div id='empty' style={{ gridColumn: '3/4' }}>{null}</div>
                    </div>
                    </div>
                );
                temp.push(slide);
                this.setState({
                    slides:temp
                })
            })
        }
    }

    render(){
        return(
            <div style={{height:'87vh'}}>
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                <Slider ref={c => (this.slider = c)} className='slider-bibiliografie' dots={false} arrows={false}>
                    {this.state.slides}
                </Slider>
                <LeftArrow onClick={this.previous} />
                <RightArrow onClick={this.next}/>
            </div>
        )
    }
}