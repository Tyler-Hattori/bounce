import React from 'react'
import SwordImage from './Images/sword.png'

function Sword(props) {
    return (
        <img src= {SwordImage}
        style= {{height: props.height,
            top: props.yPos,
            left: props.xPos}}/>
    )
}

export default Sword