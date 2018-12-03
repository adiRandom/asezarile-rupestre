import React from 'react'
import Arrow from './Arrow'
import * as background from '../assets/icons/book-icon.png'

export default class Book_old extends React.Component {
    constructor(props) {
        super(props);
        let initialElement = (
            <div id='book' style={{
                backgroundImage: background,
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <div id='left-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '1/2',
                    position: 'relative'
                }}>
                    <div id='left-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[0]}
                    </div>
                </div>
                <div id='right-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '2/3',
                    position: 'relative'
                }}>
                    <div id='right-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[1]}
                    </div>
                </div>
            </div>
        )
        this.state = {
            leftIndice: 0, //The indice of the text displayed on the left page
            rightIndice: 1, //The indice of the text displayed on the right page
            element: initialElement
        }
    }

    //A function to handle the event sent by the arrows on click
    //Calls the appropiate handler based on the orientation property
    arrowClickHandler = (e) => {
        if (e.orientation === 'left')
            this.turnLeftPage();
        else
            this.turnRightPage();
    }

    //A function that handles the turning of the left page
    turnLeftPage = () => {
        //Modify the element acordingly
        let element = (
            <div id='book' style={{
                backgroundImage: background,
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <div id='left-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '1/2',
                    position: 'relative'
                }}>
                    <div id='left-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.leftIndice]}
                    </div>
                    {/* Add this dummy-page div to perform the animation with */}
                    <div id='dummy-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        transition: 'all 3s ease-in'
                    }}>
                        {this.props.data[this.state.leftIndice]}
                    </div>
                </div>
                <div id='right-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '2/3',
                    position: 'relative'
                }}>
                    <div id='right-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.rightIndice]}
                    </div>
                </div>
            </div>
        );
        this.setState({
            element: element
        }, () => this.startLeftAnimation() ) //Set the element as current state and call the function responsable of starting the animation
    }

    //The function responsabel of starting the left page animation
    startLeftAnimation = () => {
        let element = (
            <div id='book' style={{
                backgroundImage: background,
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <div id='left-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '1/2',
                    position: 'relative'
                }}>
                    <div id='left-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.leftIndice - 2 >= 0 ? this.state.leftIndice - 2 : this.props.data.length - 2]}
                    </div>
                    {/* Rotate the dummy page */}
                    <div id='dummy-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        transition: 'all 3s ease-in',
                        transform: 'rotateY(-90deg)'
                    }}>
                        {this.props.data[this.state.leftIndice]}
                    </div>
                </div>
                <div id='right-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '2/3',
                    position: 'relative'
                }}>
                    <div id='right-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.rightIndice]}
                    </div>
                </div>
            </div>
        );
        this.setState((prev) => ({
            element: element,
            leftIndice: prev.leftIndice - 2 >= 0 ? prev.leftIndice - 2 : this.props.data.length - 2
        }), () => setTimeout(this.endLeftAnimation, 3000)) //Set the element as current state and call the function responsable of finishing the animation
    }

    //The function responsabel of starting the left page animation
    endLeftAnimation = () => {
        let element = (
            <div id='book' style={{
                backgroundImage: background,
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <div id='left-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '1/2',
                    position: 'relative'
                }}>
                    <div id='left-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.leftIndice]}
                    </div>
                </div>
                <div id='right-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '2/3',
                    position: 'relative'
                }}>
                    <div id='right-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.rightIndice - 2 >= 0 ? this.state.rightIndice - 2 : this.props.data.length - 1]}
                    </div>
                    {/* Step 1: Reposition the dummy page so that the text won't end up not upsite down 
                    */}
                    <div id='dummy-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        transform: 'rotateY(90deg)'
                    }}>
                        {this.props.data[this.state.leftIndice]}
                    </div>
                </div>
            </div>
        );
        //Now update the state so that the changes are applyed to the DOM
        this.setState({
            element: element
        }, () => {
            let element = (
                <div id='book' style={{
                    backgroundImage: background,
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr'
                }}>
                    <div id='left-page-wrapper' style={{
                        width: '100%',
                        height: '100%',
                        gridColumn: '1/2',
                        position: 'relative'
                    }}>
                        <div id='left-page' style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0
                        }}>
                            {this.props.data[this.state.leftIndice]}
                        </div>
                    </div>
                    <div id='right-page-wrapper' style={{
                        width: '100%',
                        height: '100%',
                        gridColumn: '2/3',
                        position: 'relative'
                    }}>
                        <div id='right-page' style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0
                        }}>
                            {this.props.data[this.state.rightIndice]}
                        </div>
                        {/* Step 2: Update the text on the dummy page
                            Step 3: Finish the animation
                    */}
                        <div id='dummy-page' style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            transition: 'all 3s ease-out',
                            transform: 'rotateY(0)'
                        }}>
                            {this.props.data[this.state.rightIndice - 2 >= 0 ? this.state.rightIndice - 2 : this.props.data.length - 1]}
                        </div>
                    </div>
                </div>
            );
            this.setState({
                element: element
            }, () => setTimeout(this.cleanLeftAnimation, 3000)) ////Set the element as current state and call the function responsable of cleaning the animation
        })
    }

    //A function that handles the turning of the right page
    turnRightPage = () => {
        //Modify the element acordingly
        let element = (
            <div id='book' style={{
                backgroundImage: background,
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <div id='left-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '1/2',
                    position: 'relative'
                }}>
                    <div id='left-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.leftIndice]}
                    </div>
                </div>
                <div id='right-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '2/3',
                    position: 'relative'
                }}>
                    <div id='right-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.rightIndice]}
                    </div>
                    {/* Add this dummy-page div to perform the animation with */}
                    <div id='dummy-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        transition: 'all 3s ease-in'
                    }}>
                        {this.props.data[this.state.rightIndice]}
                    </div>
                </div>
            </div>
        );
        this.setState({
            element: element
        }, () => this.startRightAnimation()) //Set the element as current state and call the function responsable of starting the animation
    }

    //The function responsabel of starting the left page animation
    startRightAnimation = () => {
        let element = (
            <div id='book' style={{
                backgroundImage: background,
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <div id='left-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '1/2',
                    position: 'relative'
                }}>
                    <div id='left-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.leftIndice]}
                    </div>
                </div>
                <div id='right-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '2/3',
                    position: 'relative'
                }}>
                    <div id='right-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.rightIndice + 2 < this.props.data.length ? this.state.rightIndice + 2 : 1]}
                    </div>
                    {/* Rotate the dummy page */}
                    <div id='dummy-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        transition: 'all 3s ease-in',
                        transform: 'rotateY(90deg)'
                    }}>
                        {this.props.data[this.state.rightIndice + 2 < this.props.data.length ? this.state.rightIndice + 2 : 1]}
                    </div>
                </div>
            </div>
        );
        this.setState((prev) => ({
            element: element,
            rightIndice: prev.rightIndice + 2 < this.props.data.length ? prev.rightIndice + 2 : 1
        }), () => setTimeout(this.endRightAnimation, 3000)) //Set the element as current state and call the function responsable of finishing the animation
    }

    //The function responsabel of starting the left page animation
    endRightAnimation = () => {
        let element = (
            <div id='book' style={{
                backgroundImage: background,
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <div id='left-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '1/2',
                    position: 'relative'
                }}>
                    <div id='left-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.leftIndice]}
                    </div>
                    {/* Step 1: Reposition the dummy page so that the text won't end up not upsite down 
                    */}
                    <div id='dummy-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        transform: 'rotateY(-90deg)'
                    }}>
                        {this.props.data[this.state.leftIndice + 2 < this.props.data.length ? this.state.leftIndice + 2 : 0]}
                    </div>
                </div>
                <div id='right-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '2/3',
                    position: 'relative'
                }}>
                    <div id='right-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.rightIndice]}
                    </div>
                </div>
            </div>
        );
        //Now update the state so that the changes are applyed to the DOM
        this.setState({
            element: element
        }, () => {
            let element = (
                <div id='book' style={{
                    backgroundImage: background,
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr'
                }}>
                    <div id='left-page-wrapper' style={{
                        width: '100%',
                        height: '100%',
                        gridColumn: '1/2',
                        position: 'relative'
                    }}>
                        <div id='left-page' style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0
                        }}>
                            {this.props.data[this.state.leftIndice]}
                        </div>
                        {/* Step 2: Update the text on the dummy page
                            Step 3: Finish the animation
                    */}
                        <div id='dummy-page' style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            transition: 'all 3s ease-out',
                            transform: 'rotateY(0)'
                        }}>
                            {this.props.data[this.state.leftIndice + 2 < this.props.data.length ? this.state.leftIndice + 2 : 0]}
                        </div>
                    </div>
                    <div id='right-page-wrapper' style={{
                        width: '100%',
                        height: '100%',
                        gridColumn: '2/3',
                        position: 'relative'
                    }}>
                        <div id='right-page' style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0
                        }}>
                            {this.props.data[this.state.rightIndice]}
                        </div>
                    </div>
                </div>
            );
            this.setState({
                element: element
            }, () => setTimeout(this.cleanRightAnimation, 3000)) ////Set the element as current state and call the function responsable of cleaning the animation
        })
    }


    cleanLeftAnimation = () => {
        let element = (
            <div id='book' style={{
                backgroundImage: background,
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <div id='left-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '1/2',
                    position: 'relative'
                }}>
                    <div id='left-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.leftIndice]}
                    </div>
                </div>
                <div id='right-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '2/3',
                    position: 'relative'
                }}>
                    <div id='right-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.rightIndice - 2 >= 0 ? this.state.rightIndice - 2 : this.props.data.length - 1]}
                    </div>
                    {/* Remove the dummy page*/}
                </div>
            </div>
        );
        this.setState((prev) => ({
            element: element,
            rightIndice: prev.rightIndice - 2 >= 0 ? prev.rightIndice - 2 : this.props.data.length - 1
        })) ////Set the element as current state and update the inidices
    }


    cleanRightAnimation = () => {
        let element = (
            <div id='book' style={{
                backgroundImage: background,
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <div id='left-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '1/2',
                    position: 'relative'
                }}>
                    <div id='left-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.leftIndice + 2 < this.props.data.length ? this.state.leftIndice + 2 : 0]}
                    </div>
                </div>
                <div id='right-page-wrapper' style={{
                    width: '100%',
                    height: '100%',
                    gridColumn: '2/3',
                    position: 'relative'
                }}>
                    <div id='right-page' style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0
                    }}>
                        {this.props.data[this.state.rightIndice]}
                    </div>
                    {/* Remove the dummy page*/}
                </div>
            </div>
        );
        this.setState((prev) => ({
            element: element,
            leftIndice: prev.leftIndice + 2 < this.props.data.length ? prev.leftIndice + 2 : 0
        })) ////Set the element as current state and update the inidices
    }

    render() {
        return (
            <div id='book-container' style={{
                display: 'flex',
                height: '40vh'
            }}>
                <Arrow orientation='left' onClick={this.arrowClickHandler} />
                {this.state.element}
                <Arrow orientation='right' onClick={this.arrowClickHandler} />
            </div>
        )
    }
}