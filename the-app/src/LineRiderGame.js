import './LineRiderGame.css'
import React from 'react'
import GameOver from './GameOver.js'

class LineRiderGame extends React.Component {
    constructor(props) {
        super(props);
        
    this.handleKeyDown = this.handleKeyDown.bind(this)

        this.state = {
            yPos: 150,
            timeoutId: 0,
            gameLoopTimeout: 50,
            ballSpeed: 0,
            gravity: 2,
            ballSize: 40,
            bounced: false,
            isGameover: false,
        }
    }

    //runs immediately after LineRiderGame is created
    componentDidMount() {
        this.startGame()
        window.addEventListener('keydown', this.handleKeyDown)
        this.gameLoop()
    }

    startGame() {
        //Game
        //Ball 
        this.setState ({
        })
    }

    gameLoop() {
        let timeoutId = setTimeout(() => {
            if (!this.state.isGameOver) {
              this.fall()
            }
      
            this.gameLoop()
          }, this.state.gameLoopTimeout)
      
        this.setState({ timeoutId })
    }

    componentWillUnmount() {
        clearTimeout(this.state.timeoutId)
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    fall() {
        let grav = this.state.gravity
        let ball_speed = this.state.ballSpeed
        let y = this.state.yPos + ball_speed
        let game_height = document.getElementById("fill_screen").clientHeight - this.state.ballSize - 10
        if (this.state.yPos >= game_height && !this.state.bounced) {
            ball_speed *= -1
            this.setState({bounced: true})
        }
        if (this.state.yPos < game_height && this.state.bounced) {
            this.setState({bounced: false})
        }
        this.setState({
            ballSpeed: ball_speed + grav,
            yPos: y})
    }

    resetGame() {
        //reset the Game
        //reset the Ball position

        this.setState({
            
        })
    }

    handleKeyDown(event) {
        // if mouse is pressed


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
            <div id = "fill_screen">
                <img src= "https://clipart.info/images/ccovers/1495749720Bowling-Ball-PNG-Clip-Art.png"
                    style= {{height: this.state.ballSize, top: this.state.yPos}} 
                    id= "ball-image"
                    className = 'Ball'/>            
            </div>
        )
    }
}
export default LineRiderGame;