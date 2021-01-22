import './LineRiderGame.css'
import React from 'react'
import Congrats from './GameOver.jsx'

class LineRiderGame extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    //runs immediately after LineRiderGame is created
    componentDidMount() {
        this.startGame()
        this.gameLoop()
    }

    startGame() {
        //Game
        //Ball position

        this.setState ({

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
            <div>

            </div>
        )
    }
}
export default LineRiderGame;