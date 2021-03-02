import React from 'react'
import LaserImage from './Images/laser.jpg'

function Laser(props) {
    return (
        <img src= {LaserImage}
        style= {{height: props.height,
            position: 'absolute',
            top: props.yPos,
            left: props.xPos}}/>
    )
}

export default Laser