import React from 'react'
import TileImage from './Images/tile.jpg'

function Tile(props) {
    return (
        <img src= {TileImage}
            style= {{height: props.height,
            position: "absolute",
            left: props.xPos,
            top: props.yPos}}/>
    )
}

export default Tile