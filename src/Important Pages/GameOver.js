import React, {useState} from 'react'
import './GameOver.css'
import database from '../firebase'

function GameOver(props) {
    let [bestTime, setBestTime] = useState(0)
    let lengthString = "string"
    let difficultyString = "string"

    if (props.length === "3 obstacles") lengthString = "super short"
    else if (props.length === "4 obstacles") lengthString = "short"
    else if (props.length === "5 obstacles") lengthString = "standard"
    else if (props.length === "7 obstacles") lengthString = "long"
    else if (props.length === "9 obstacles") lengthString = "quite long"
    else if (props.length === "12 obstacles") lengthString = "very long"

    if (props.difficulty == 1) difficultyString = "plebian"
    else if (props.difficulty == 2) difficultyString = "easy"
    else if (props.difficulty == 3) difficultyString = "medium"
    else if (props.difficulty == 4) difficultyString = "hard"
    else if (props.difficulty == 5) difficultyString = "expert"

    database.ref(props.length+'/'+props.difficulty).push(props.time)
    database.ref(props.length+'/'+props.difficulty).orderByValue().limitToFirst(1).once("value",(snapshot) => {
        snapshot.forEach((child)=>{setBestTime(child.val())})  })
    // database.ref(props.length+'/'+props.difficulty).orderByValue().once("value",(snapshot) => {
    //     snapshot.forEach((child)=>{
    //         if (child.val() > bestTime) database.ref(props.length+'/'+props.difficulty+'/'+child.key).remove()
    //     })  
    // })
    let newRecord = false

    if(bestTime == props.time) newRecord = true;
    
    return(
        <div id= "background_game_over">
            <div className= "section">
                <p style= {{fontSize: '6vmin'}}>Nice Work!</p>
                <p style= {{fontSize: '2vmin'}}>Attempts: {props.attempts}</p>
                <p style= {{fontSize: '4vmin'}}>Time: {props.time}s</p>
                <p style= {{fontSize: '2vmin'}}>On a {lengthString} {difficultyString} course</p>
                {newRecord ? <p>New Record!!</p>:<p>Best Time: {bestTime}</p>}
            </div>
            <button className = "new_game" onClick= {() => {document.location.reload()}}>New Game</button>
        </div>
    )
}

export default GameOver