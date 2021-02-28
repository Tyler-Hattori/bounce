import React, {useState} from 'react'
import './LineRiderGame.css'
import Background from '../Backgrounds/pink_sky.jpg'
import database from '../firebase'

function GameOver(props) {
    const [newRecord, setNewRecord] = useState(false)
    const [best, setBest] = useState(0)

    let data = database.ref('/users/times')
    let bestTime = props.time
    for (let i=0; i < data.length;i++) {
        if (props.data[i] < bestTime)
            bestTime = props.data[i]
    }
    setBest(bestTime)
    if (bestTime == props.time) {
        database.ref('/users/times').unshift(bestTime)
        if (database.ref('/users/times').length > 5) database.ref('users/times').pop()
        setNewRecord(true)
    }
    return(
        <div id= 'fill_screen' style= {{backgroundImage: 'url('+Background+')'}}>
            <div className= "section">
                <p style= {{fontSize: '6vmin', marginTop: 20, marginLeft: 20, marginRight: 20}}>You Passed!</p>
                <p style= {{fontSize: '4vmin', marginTop: 20, marginLeft: 20, marginRight: 20}}>Time: {props.time}</p>
                <p>Best Time: {best}</p>
                {newRecord ? <p>New Record!!</p>:null}
            </div>
        </div>
    )
}

export default GameOver