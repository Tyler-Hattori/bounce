import './LineRiderGame.css'
import React from 'react'
import GameOver from './GameOver.js'

class LineRiderGame extends React.Component {
    constructor(props) {
        super(props);
        
    this.handleKeyDown = this.handleKeyDown.bind(this)

        this.state = {
            yPos: 150,
            xPos: 350,
            ballDirection: '',
            timeoutId: 0,
            gameLoopTimeout: 50,
            ballSpeedY: 0,
            ballSpeedX: 0,
            gravity: 1.7,
            xAcceleration: 0.6,
            ballSize: 40,
            keyPressed: false,
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
              this.changeDirection()
              this.setState({ keyPressed: false, ballDirection: 'zero acceleration' })
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
        let ball_speed = this.state.ballSpeedY
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
            ballSpeedY: ball_speed + grav,
            yPos: y})
    }

    changeDirection() {
        switch (this.state.ballDirection) {
          case 'left':
              this.moveSideways('left')
            break
          case 'right':
              this.moveSideways('right')
              break
          case 'zero acceleration':
              this.moveSideways('zero acceleration')
            break
          default:
        }
    }

    moveSideways(dir) {
        let acceleration = this.state.xAcceleration
        let ball_speed = this.state.ballSpeedX
        if (dir === 'left')
            acceleration = acceleration * -1
        if (dir === 'zero acceleration')
            acceleration = 0;
        let x = this.state.xPos + ball_speed
        this.setState({
            ballSpeedX: ball_speed + acceleration,
            xPos: x
        })
    }

    resetGame() {
        //reset the Game
        //reset the Ball position

        this.setState({
            
        })
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
            case 37:
                this.setState({ ballDirection: 'left' })
                break
            case 39:
                this.setState({ ballDirection: 'right' })
                break
            default:
        }
        this.setState({
            keyPressed: true
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
                    style= {{height: this.state.ballSize, 
                        top: this.state.yPos,
                        left: this.state.xPos}} 
                    id= "ball-image"
                    className = 'Ball'
                    alt = "ball"/>            
            </div>
        )
    }
}
export default LineRiderGame;