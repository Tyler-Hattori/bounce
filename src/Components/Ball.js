import React from 'react'
import './Ball.css'

function Ball(props) {
    return (
        <img src= {props.image}
        style= {{height: props.height,
            top: props.yPos,
            left: props.xPos}} 
            id= "ball-image"
            className = 'Ball'/>
    )
}

export default Ball