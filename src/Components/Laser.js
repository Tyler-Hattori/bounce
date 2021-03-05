import React from 'react'
import './Laser.css'

function Laser(props) {
    return (
        <img src= {props.laserImage} className= "laser" id= {props.id}
        style= {{height: props.width,
            position: 'absolute',
            top: props.yPos,
            left: props.xPos}}/>
    )
}

export default Laser