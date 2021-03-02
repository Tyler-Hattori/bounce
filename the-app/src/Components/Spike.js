import React from 'react'
import './Spike.css'

function Spike(props) {
    let rand = Math.random()
    return (
        <img src= {props.image} id= "spike" 
        style= {{position: 'absolute', 
            height: props.height, 
            left: props.xPos, 
            top: props.yPos,
            animationDelay: {rand}+'s'}}/>
    )
}

export default Spike