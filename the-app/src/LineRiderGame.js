import './LineRiderGame.css'
import React from 'react'
import GameOver from './GameOver.js'

class LineRiderGame extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ballSpeed: 0,
            gravity: 1,
            isGameover: false,
        }
    }

    //runs immediately after LineRiderGame is created
    componentDidMount() {
        this.startGame()
        this.gameLoop()
    }

    startGame() {
        //Game
        //Ball 
        let ballSpeed = this.props.ballSpeed
        this.setState ({
            ballSpeed,
        })
    }

    gameLoop() {
        //Loop the Game
        this.setState({

        })
    }

    resetGame() {
        //reset the Game
        //reset the Ball position

        this.setState({

        })
    }

    //runs when we update props or components
    render() {
        // If the run was a success
        if (this.state.isGameOver) {
            return (
                <GameOver
                    //define components
                />
            )
        }

        return(
            <div className = 'Ball'>
                <img src= "https://clipart.info/images/ccovers/1495749720Bowling-Ball-PNG-Clip-Art.png" height= "20px"/>            
            </div>
        )
    }
}
export default LineRiderGame;