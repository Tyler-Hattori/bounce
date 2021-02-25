import './LineRiderGame.css'
import React from 'react'
import GameOver from './GameOver.js'
import Ball from '../Components/Ball'
import Tile from '../Components/Tile'
import QuestionBox from '../Components/QuestionBox'
import QBoxHandling from '../Components/Images/question_box_handling.png'
import QBoxMiniBall from '../Components/Images/question_box_mini_ball.png'
import Spring from '../Components/Spring'
import SpringImage from '../Components/Images/spring.png'
import Laser from '../Components/Laser'
import Arrow from '../Components/Arrow'
import Sword from '../Components/Sword'
import MobingPlatform from '../Components/MovingTile'

class LineRiderGame extends React.Component {
    constructor(props) {
        super(props)
        
        this.handleKeyDown = this.handleKeyDown.bind(this)

        this.state = {
            screenWidth: 1620,
            screenHeight: 977,
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
            collidedObj: <Tile/>,
            qboxanim: false,
            springanim: false,
            time1: 0,
            time2: 0,
            qBoxImage: QBoxHandling,
        }

    }
    
    componentDidMount() {
        this.obstacles = []
        this.qBoxImages = [QBoxHandling,QBoxMiniBall]
        this.obstacles.push(<Tile height= {100} width= {100} xPos={800} yPos={this.state.screenHeight - 50}/>)
        this.generateObstacles(this.state.difficulty)
        window.addEventListener('keydown', this.handleKeyDown)
        this.gameLoop()
    }

    generateObstacles(difficulty) {
        switch (difficulty) {
            case 1:
                this.randomPlebianCourse()
                break
            case 2:
                this.randomEasyCourse()
                break
            case 3:
                this.randomMediumCourse()
                break
            case 4:
                this.randomHardCourse()
                break;
            case 5:
                this.randomExpertCourse()
                break;
        }
    }

    randomPlebianCourse() {
        return (<Spring index= {1} height= {314} xPos={1000} yPos={this.state.screenHeight - 100}/>)
    }

    randomEasyCourse() {
        this.obstacles.push(<Spring height= {314} width= {50} xPos={1000} yPos={this.state.screenHeight - 100}/>)
        this.obstacles.push(<QuestionBox height= {50} width= {50} xPos={1000} yPos={500}/>)
    }

    randomMediumCourse() {
        this.obstacles.push(<Spring height= {314} width= {50} xPos={1000} yPos={this.state.screenHeight - 100}/>)
    }

    randomHardCourse() {
        return (<Spring index= {1} height= {314} xPos={1000} yPos={this.state.screenHeight - 100}/>)
    }

    randomExpertCourse() {
        return (<Spring index= {1} height= {314} xPos={1000} yPos={this.state.screenHeight - 100}/>)
    }

    gameLoop() {
        let timeoutId = setTimeout(() => {
            if (!this.state.isGameOver) {
                if (this.state.qboxanim) this.setState({time2: 20000 - new Date().getTime() + this.state.time1})
                if (this.state.springanim && this.state.yPos < 300) this.setState({springanim:false})
                if (this.state.time2 < 0) this.setState({qboxanim:false, xAcceleration: 4, ballsize: 40, gravity: this.state.difficulty/2})
                this.changeDirection()
                if (this.state.yPos > this.state.screenHeight-30) this.resetGame()
                this.setState({ keyPressed: false, ballDirection: 'zero acceleration' })
                this.fall()
            }
            this.gameLoop()
          }, this.state.gameLoopTimeout)
        this.setState({ timeoutId })
    }
    
    resetGame() {
        let attempts = this.state.attempts
        this.obstacles= []
        this.obstacles.push(<Tile height= {100} width = {100} xPos={800} yPos={this.state.screenHeight - 50}/>)
        this.generateObstacles(this.state.difficulty)
        this.setState({
            xPos: 0,
            yPos: 150,
            ballSize: 40,
            gravity: this.props.difficulty/2,
            ballDirection: '',
            timeoutId: 0,
            ballSpeedY: 0,
            ballSpeedX: 0,
            keyPressed: false,
            bounced: false,
            attempts: attempts + 1,
            qboxanim: false,
            springanim: false,
            xAcceleration: 4,
            time1: 0,
            time2: 0,
        })
    }

    fall() {
        let grav = this.state.gravity
        let ball_speed = this.state.ballSpeedY
        let y = this.state.yPos
        if (this.isThereCollision(this.obstacles) && !this.state.bounced) {
            if (this.state.collidedObj.type === Tile) {
                ball_speed *= -1
                ball_speed += this.state.difficulty
                this.setState({bounced: true})
            }
            else if (this.state.collidedObj.type === QuestionBox && !this.state.qboxanim) {
                let rand = Math.round(Math.random()*2)
                this.setState({qboxanim: true})
                if (this.qBoxImages[rand] === QBoxHandling) this.setState({qBoxImage: QBoxHandling, xAcceleration: 15, time1: new Date().getTime()})
                else if (this.qBoxImages[rand] === QBoxMiniBall) this.setState({qBoxImage: QBoxMiniBall, ballSize: 20, gravity: this.state.gravity*2/3, time1: new Date().getTime()})
            }
            else if (this.state.collidedObj.type === Spring) {
                ball_speed = -40-grav
                this.setState({springanim: true, bounced: true, ballSpeedY: ball_speed, yPos: y + ball_speed})
            }
        }
        else if (!this.isThereCollision(this.obstacles) && this.state.bounced) {
            this.setState({bounced: false})
        }
        this.setState({ballSpeedY: ball_speed + grav, yPos: y + ball_speed})
    }

    isThereCollision(arr) {
        let ball = {x: this.state.xPos + this.state.ballSize/2, y: this.state.yPos + this.state.ballSize, 
                    width: this.state.ballSize, height: this.state.ballSize}
        let collidedObj = arr.find(a => {
            if (a === undefined || a.props === undefined) return false
            let obstacle = {x: a.props.xPos - 800, y: a.props.yPos, width: a.props.width, height: a.props.height}
            if (ball.x < obstacle.x + obstacle.width && ball.x > obstacle.x &&
                ball.y >= obstacle.y && ball.y <= obstacle.y+obstacle.height) {
                    this.setState({collidedObj: a})
                    return true
                }
            return false
        })

        return collidedObj
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
        if (this.state.xPos < -800 && dir === 'left')
            ball_speed = 0
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

    componentWillUnmount() {
        clearTimeout(this.state.timeoutId)
        window.removeEventListener('keydown', this.handleKeyDown)
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
                        {this.obstacles}
                        {this.state.springanim ? <div className= "springanim" style= {{top: this.state.screenHeight-100, marginLeft: 1000, backgroundImage: 'url('+SpringImage+')'}}/>:<div/>}
                        <Ball xPos= {800 + this.state.xPos}
                        yPos={this.state.yPos}
                        height={this.state.ballSize}/>
                        <p className= "attempt" style= {{left: -1*this.state.xPos}}>Attempt: {this.state.attempts}</p>
                    </div>
                    {this.state.qboxanim ? <p className= "time">{this.state.time2}</p>:<p/>}
                    {this.state.qboxanim ? <div className= "qboxanim" style= {{backgroundImage: 'url('+this.state.qBoxImage+')'}}/>:<div/>}
                </div>
            )
        }
    }
}

export default LineRiderGame