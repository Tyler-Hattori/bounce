import React from 'react'
import SpikeImage from './Images/spike.png'
import './Spike.css'

function Spike(props) {
    let rand = Math.random()
    return (
        <img src= {SpikeImage} id= "spike" 
        style= {{position: 'absolute', 
            height: props.height, 
            left: props.xPos, 
            top: props.yPos,
            animationDelay: {rand}+'s'}}/>
    )
}

export default Spike