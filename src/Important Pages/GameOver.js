import React, {useState} from 'react'
import './GameOver.css'
import database from '../firebase'

function GameOver(props) {
    let [bestTime, setBestTime] = useState(0)
    let [length, setLength] = useState("")

    if (props.length == 3) setLength("super short")
    else if (props.length == 4) setLength("short")
    else if (props.length == 5) setLength("standard")
    else if (props.length == 7) setLength("long")
    else if (props.length == 9) setLength("quite long")
    else if (props.length == 12) setLength("very long")

    database.ref(props.length+'/'+props.difficulty).push(props.time)
    database.ref(props.length+'/'+props.difficulty).orderByValue().limitToFirst(1).once("value",(snapshot) => {
        snapshot.forEach((child)=>{setBestTime(child.val())})  })
    database.ref(props.length+'/'+props.difficulty).orderByValue().once("value",(snapshot) => {
        snapshot.forEach((child)=>{
            if (child.val() > bestTime) database.ref(props.length+'/'+props.difficulty+'/'+child.key).remove()
        })  
    })
    let newRecord = false

    if(bestTime == props.time) newRecord = true;
    
    return(
        <div id= "background_game_over">
            <div className= "section">
                <p style= {{fontSize: '6vmin'}}>Nice Work!</p>
                <p style= {{fontSize: '4vmin'}}>Time: {props.time}s</p>
                <p style- {{fontSize: '2vmin'}}>On a {length} {props.difficulty} course</p>
                {newRecord ? <p>New Record!!</p>:<p>Best Time: {bestTime}</p>}
            </div>
            <button className = "new_game" onClick= {() => {document.location.reload()}}>New Game</button>
        </div>
    )
}

export default GameOver