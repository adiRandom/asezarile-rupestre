import React from 'react'
import FlipPage from 'react-flip-page'
import * as background from '../assets/icons/book-icon-yellow.png'
export default class Book extends React.Component {
    render() {
        return (
            <div style={{
                width: '60vw', 
                height: '60vh', 
                backgroundImage: `url(${background})`,
                backgroundSize:'cover'
            }}>
                <FlipPage orientation='horizontal' responsive={true} pageBackground='rgba(255,255,255,0)'>
                    {this.props.data.map((item, key) => {
                        if (key % 2 == 0)
                            return (
                                <div key={key} class='pages'>
                                    <div class='page' style={{
                                        display: 'inline-block',
                                        width: '30vw'
                                    }}>
                                        {item}
                                    </div>
                                    <div class='page' style={{
                                        display: 'inline-block',
                                        width: '30vw'
                                    }}>
                                        {this.props.data[key + 1] ? this.props.data[key + 1] : null}
                                    </div>
                                </div>
                            )
                        return null
                    })}
                </FlipPage>
            </div>
        )
    }
}