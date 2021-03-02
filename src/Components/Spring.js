import React from 'react'
import SpringImage from './Images/spring.png'

function Spring(props) {
    return (
        <img src= {SpringImage}
            style= {{left: props.xPos, top: props.yPos, position: 'absolute', height: props.height}}/>
    )
}

export default Spring