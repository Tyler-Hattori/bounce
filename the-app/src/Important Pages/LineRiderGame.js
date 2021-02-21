import './LineRiderGame.css'
import React from 'react'
import GameOver from './GameOver.js'
import Ball from '../Components/Ball'
import Tile from '../Components/Tile'
import tileImage from '../Backgrounds/tile.jpg'

class LineRiderGame extends React.Component {
    constructor(props) {
        super(props)
        
        this.handleKeyDown = this.handleKeyDown.bind(this)

        this.state = {
            yPos: 150,
            xPos: 0,
            ballDirection: '',
            timeoutId: 0,
            gameLoopTimeout: 50,
            ballSpeedY: 0,
            ballSpeedX: 0,
            maxSpeed: 30,
            gravity: props.difficulty/2,
            xAcceleration: 4,
            ballSize: 40,
            keyPressed: false,
            bounced: false,
            isGameover: false,
            loggedIn: false,
            setName: '',
            attempts: 1,
            difficulty: props.difficulty,
            background: props.background,
        }
    }

    componentDidMount() {
        this.tiles = []
        this.usedTileSpawningPoints = []
        this.initiateTiles()
        window.addEventListener('keydown', this.handleKeyDown)
        this.gameLoop()
    }

    initiateTiles() {
        this.tiles.push(<Tile image={tileImage} height= {100} xPos={800} yPos={document.getElementById("fill_screen").clientHeight - 50}/>)
        for (let j = 0; j < 2; j++) {
            this.usedTileSpawningPoints.push(j)
            let tileCount = 8 - Math.floor(Math.random() * (this.state.difficulty))
            for (let i = 0; i < tileCount; i++) {
                let x = (j*800) + Math.floor(Math.random() * 8) * 100
                let y = document.getElementById("fill_screen").clientHeight - 50            
                
                this.tiles.push(<Tile image={tileImage} height= {100} xPos={x} yPos={y}/>)
            }
        }
    }

    resetGame() {
        let attempts = this.state.attempts
        this.tiles= []
        this.usedTileSpawningPoints = []
        this.initiateTiles()
        this.setState({
            xPos: 0,
            yPos: 150,
            ballDirection: '',
            timeoutId: 0,
            ballSpeedY: 0,
            ballSpeedX: 0,
            keyPressed: false,
            bounced: false,
            attempts: attempts + 1,
        })
    }

    createGround() {
        let ground = this.tiles
        this.tiles = []
        this.usedTileSpawningPoints = []
        this.usedTileSpawningPoints.push(Math.floor(this.state.xPos/800)+1)
        let tileCount = 8 - Math.floor(Math.random() * (this.state.difficulty))
        for (let i = 0; i < tileCount; i++) {
            let x = Math.floor(this.state.xPos/800)*800 + 800 + Math.floor(Math.random() * 8) * 100
            let y = document.getElementById("fill_screen").clientHeight - 50            
            
            this.tiles.push(<Tile image={tileImage} height= {100} xPos={x} yPos={y}/>)
        }
        this.tiles.push(ground)
    }

    gameLoop() { 

        let timeoutId = setTimeout(() => {
            if (!this.state.isGameOver) {
              if (this.state.xPos % 800 <= this.state.ballSpeedX && this.state.xPos % 800 > 0 && this.state.xPos > this.state.maxSpeed
                && !this.spawnedTilesAt(Math.floor(this.state.xPos/800)+1))
                this.createGround()
              this.changeDirection()
              if (this.state.yPos > document.getElementById("fill_screen").clientHeight-30)
                this.resetGame()
              this.setState({ keyPressed: false, ballDirection: 'zero acceleration' })
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
        let ball_speed = this.state.ballSpeedY
        let y = this.state.yPos + ball_speed
        if (this.isThereCollision(this.tiles) && !this.state.bounced) {
            ball_speed *= -1
            this.setState({bounced: true})
        }
        if (!this.isThereCollision(this.tiles) && this.state.bounced) {
            this.setState({bounced: false})
        }
        this.setState({
            ballSpeedY: ball_speed + grav,
            yPos: y})
    }

    isThereCollision(arr) {
        let ball = {x: this.state.xPos + this.state.ballSize/2, y: this.state.yPos + this.state.ballSize + this.state.ballSpeedY*7/4, 
                    width: this.state.ballSize, height: this.state.ballSize}
        let collided = arr.find(a => {
            if (a.props === undefined)
                return false
            let tile = {x: a.props.xPos - 800, y: a.props.yPos, width: a.props.height, height: a.props.height}
            if (ball.x < tile.x + tile.width && ball.x > tile.x &&
                ball.y >= tile.y)
                return true
            return false
        })

        return collided
    }

    spawnedTilesAt(xPos) {
        for (let i = 0; i < this.usedTileSpawningPoints; i++) {
            if (this.usedTileSpawningPoints[i] == xPos)
                return true
        }
        return false
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
            acceleration = 0
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
                    <div id = "background" style= {{left: -1*this.state.xPos/2, backgroundImage: 'url('+this.state.background+')'}}/>
                    <div id= "fill_screen" style= {{left: -1*this.state.xPos}}>
                        {this.tiles}
                        <Ball xPos= {800 + this.state.xPos}
                        yPos={this.state.yPos}
                        height={this.state.ballSize}/>
                        <p className= "attempt" style= {{left: -1*this.state.xPos}}>Attempt: {this.state.attempts}</p>
                    </div>
                </div>
            )
        }
    }
}
export default LineRiderGame
