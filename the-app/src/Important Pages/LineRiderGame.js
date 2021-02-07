import './LineRiderGame.css'
import '../index.css' //I moved the intro page messages to this one so that they will move away with the background
import React from 'react'
import GameOver from './GameOver.js'
import Ball from '../Components/Ball'
import Tile from '../Components/Tile'
import tileImage from '../Backgrounds/tile.jpg'

class LineRiderGame extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleKeyDown = this.handleKeyDown.bind(this)

        this.state = {
            yPos: 150,
            xPos: 220,
            ballDirection: '',
            timeoutId: 0,
            gameLoopTimeout: 50,
            ballSpeedY: 0,
            ballSpeedX: 0,
            maxSpeed: 35,
            gravity: props.difficulty,
            xAcceleration: 2,
            ballSize: 40,
            keyPressed: false,
            bounced: false,
            isGameover: false,
            loggedIn: false,
            setName: '',
            attempts: 1,
            difficulty: props.difficulty,
        }
    }

    componentDidMount() {
        this.tiles = this.createGround()
        window.addEventListener('keydown', this.handleKeyDown)
        this.gameLoop()
    }

    createGround() {
        let tiles = [];
        const tileCount = 30 - Math.floor(Math.random() * (5*this.state.difficulty));
        for (let i = 0; i < tileCount; i++) {
            const x = Math.floor(Math.random() * document.getElementById("fill_screen").clientWidth) + this.state.xPos
            const y = document.getElementById("fill_screen").clientHeight - 50            

            tiles.push(<Tile image={tileImage} height= {50} xPos={x} yPos={y}/>);
        }

        return tiles;
    }

    gameLoop() { 

        let timeoutId = setTimeout(() => {
            if (!this.state.isGameOver) {
              this.fall()
              this.changeDirection()
              this.setState({ keyPressed: false, ballDirection: 'zero acceleration' })
              if (this.state.xPos % 1000 <= this.state.ballSpeedX/2)
                this.tiles.push(this.createGround());
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
        if ((ball_speed < this.state.maxSpeed && ball_speed > this.state.maxSpeed*-1)
            || (ball_speed >= this.state.maxSpeed && acceleration < 0) || (ball_speed <= this.state.maxSpeed*-1 && acceleration > 0))
            ball_speed += acceleration
        let x = this.state.xPos + ball_speed
        this.setState({
            ballSpeedX: ball_speed,
            xPos: x
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

    render() {
        if (this.state.isGameOver) {
            return (
                <GameOver/>
            )
        }
        else {
            return(
                <div>
                    <div id= "fill_screen" style= {{left: -1*this.state.xPos}}>
                        {this.tiles}
                    </div>
                    <p className= "white_text" style= {{left: -1*this.state.xPos}}>Attempt: {this.state.attempts}        xPos: {this.state.xPos}         ballSpeedX: {this.state.ballSpeedX}</p>
                    <Ball yPos={this.state.yPos}
                        height={this.state.ballSize}/>
                </div>
            )
        }
    }
}
export default LineRiderGame;
