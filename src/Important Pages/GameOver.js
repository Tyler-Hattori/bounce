import React, {useState} from 'react'
import './GameOver.css'
import database from '../firebase'

function GameOver(props) {
    let [bestTime, setBestTime] = useState(0)
    database.ref('times/'+props.difficulty).push(props.time)
    database.ref('times/'+props.difficulty).orderByValue().limitToFirst(1).once("value",(snapshot) => {
        snapshot.forEach((child)=>{setBestTime(child.val())})  })

    let newRecord = false

    if(bestTime == props.time) newRecord = true;
    
    return(
        <div id= "background_game_over">
            <div className= "section">
                <p style= {{fontSize: '6vmin'}}>Nice Work!</p>
                <p style= {{fontSize: '4vmin'}}>Time: {props.time}s</p>
                {newRecord ? <p>New Record!!</p>:<p>Best Time: {bestTime}</p>}
            </div>
            <button className = "new_game" onClick= {() => {document.location.reload()}}>New Game</button>
        </div>
    )
}

export default GameOver