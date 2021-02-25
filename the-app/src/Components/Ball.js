import React from 'react'
import './Ball.css'
import BasketballImage from './Images/basketball.png'

function Ball(props) {
    return (
        <img src= {BasketballImage}
        style= {{height: props.height,
            top: props.yPos,
            left: props.xPos}} 
            id= "ball-image"
            className = 'Ball'/>
    )
}

export default Ball