import React from 'react'
import './Spike.css'

function Spike(props) {
    let rand = Math.floor(Math.random()*10)/10
    return (
        <img src= {props.image} id= "spike" 
        style= {{position: 'absolute', 
            height: props.width, 
            left: props.xPos, 
            top: props.yPos,
            animationDelay: {rand}+'s'}}/>
    )
}

export default Spike