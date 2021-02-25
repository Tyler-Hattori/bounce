import React from 'react'
import ArrowImage from './Images/arrow.jpg'

function Arrow(props) {
    return (
        <img src= {ArrowImage}
        style= {{height: props.height,
            top: props.yPos,
            left: props.xPos}}/>
    )
}

export default Arrow