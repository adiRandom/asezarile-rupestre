import React from 'react'
export default class Bookshef extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            styles: [],
            elements: []
        }
    }

    async componentWillMount() {
        for (let i = 0; i < this.props.data.length; i++) {
            //Add the styles for the new book in the component state
            let temp = this.state.styles;
            const style = {
                titleDisplay: 'none',
                bookHeight: '10Heightvh',
                titleSize: '1rem'
            }
            temp.push(style);
            await this.setState({
                styles: temp
            }, () => {
                //Import the book cover and add it into the state
                import(`../assets/graphics/${this.props.data[i].path}`).then((bookSrc) => {
                    let temp = this.state.books;
                    temp.push((
                        <div style={{
                            ...this.state.styles[i].bookHeight,
                            transition: 'all 1s ease-in-out'
                        }} id='book' key={i} onMouseEnter={(i) => this.onMouseEnter(i)}
                            onMouseLeave={(i) => this.onMouseLeave(i)}>
                            <img src={bookSrc} style={this.state.styles[i].bookHeight} />
                            <span id='title' style={{
                                ...this.state.styles[i].titleDisplay,
                                ...this.state.styles[i].titleSize
                            }}>{this.props.data[i].title}</span>
                        </div>
                    ))
                    this.setState({
                        books: temp,
                    })
                })
            })

            let elements = [];
            for (let i = 0; i <= this.state.books.length / 5; i++) {
                let temp = [];
                for (let j = 0; j < 5; j++)
                    temp.push((
                    <div className='col-5'>
                        <img src={this.state.books[i + j]} />
                    </div>
                    ))
                temp.push((<div className='row'>
                    {temp}
                </div>))
            }

        }
    }

    onMouseEnter = (index) => {
        //Modify the state of the selected book
        let temp = this.state.styles;
        temp[index].bookHeight = '20vh';
        temp[index].titleDisplay = 'inline'
        temp[index].titleSize = '2.5rem'
        this.setState({
            styles: temp
        })
    }

    onMouseLeave = (index) => {
        //Modify the state of the selected book
        let temp = this.state.styles;
        temp[index].bookHeight = '10vh';
        temp[index].titleDisplay = 'none'
        temp[index].titleSize = '1rem'
        this.setState({
            styles: temp
        })
    }

    render() {
        return (
            <div id='bookshelf' style={{
                display: 'flex',
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100vw',
                justifyContent: 'space-around',
                backgroundImage: bookshelf,
                backgroundRepeat: 'repeat-y',
                backgroundSize: '100vw 10vh'
            }}>
                {this.state.books}
            </div>
        )
    }
}