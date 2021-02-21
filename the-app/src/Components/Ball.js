import React from 'react'
import './Ball.css'
import Basketball from './basketball.png'

function Ball(props) {
    return (
        <img src= {Basketball}
        style= {{height: props.ballSize, 
            top: props.yPos,
            left: props.xPos}} 
            id= "ball-image"
            className = 'Ball'/>
    )
}

export default Ball