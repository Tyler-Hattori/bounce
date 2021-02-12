import React from 'react'
import './Ball.css'

function Ball(props) {
    return (
        <img src= "https://clipart.info/images/ccovers/1495749720Bowling-Ball-PNG-Clip-Art.png"
        style= {{height: props.ballSize, 
            top: props.yPos,
            left: props.xPos}} 
            id= "ball-image"
            className = 'Ball'/>
    )
}

export default Ball