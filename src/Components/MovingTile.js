import React from 'react'

function MovingTile(props) {
    return (
        <img src= {props.image}
            style= {{height: props.height,
            position: "absolute",
            left: props.xPos,
            top: props.yPos}}/>
    )
}

export default MovingTile