import React from 'react'
import GoalImage from './Images/flag.png'

function Goal(props) {
    return (
        <img src= {GoalImage} style= {{
        position: 'absolute',
        height: props.height,
        left: props.xPos,
        top: props.yPos}}/>
    )
}

export default Goal