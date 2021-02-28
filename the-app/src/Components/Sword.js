import React from 'react'
import SwordImage from './Images/sword.png'
import './Sword.css'

function Sword(props) {
    return (
        <img src= {SwordImage} id= "sword"
        style= {{height: props.height,
            position: 'absolute',
            top: props.yPos,
            left: props.xPos}}/>
    )
}

export default Sword