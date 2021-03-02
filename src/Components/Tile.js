import React from 'react'

function Tile(props) {
    return (
        <img src= {props.image}
            style= {{height: props.height,
                width: props.width,
                position: "absolute",
                left: props.xPos,
                top: props.yPos}}/>
    )
}

export default Tile