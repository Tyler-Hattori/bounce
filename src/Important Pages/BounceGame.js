import './BounceGame.css'
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
import Spike from '../Components/Spike'
import SpikeImage from '../Components/Images/spike.png'
import MovingTile from '../Components/MovingTile'
import Goal from '../Components/Goal'
import Ouch from '../Components/Images/ouch.png'
import ProgressBar from '../Components/Images/progress_bar.png'

class BounceGame extends React.Component {
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
            ballImage: props.ballImage,
            ballBarImage: props.ballBarImage,
            collidedObj: <Tile/>,
            qboxanim: false,
            springanim: false,
            deadanim: false,
            time1: 0,
            time2: 0,
            time: new Date().getTime(),
            qBoxImage: QBoxHandling,
            tileImage: props.tileImage,
            numObstacles: 10,
            springPos: 0,
            spikeImage: SpikeImage,
            died: false,
        }

    }
    
    componentDidMount() {
        this.plebianObstacles = [[]]
        this.easyObstacles = [[]]
        this.mediumObstacles = [[]]
        this.hardObstacles = [[]]
        this.expertObstacles = [[]]
        this.obstacles = []
        this.qBoxImages = [QBoxHandling,QBoxMiniBall]
        this.generateObstacles(this.state.difficulty)
        let def = this.defaultStart()
        for (let i = 0; i < def.length; i++)  this.obstacles.push(def[i])
        let unit = this.state.screenWidth/16
        let offset = unit*8
        this.obstacles.push(this.tile(this.state.screenWidth*this.state.numObstacles+offset+unit,this.state.screenHeight-unit/2))
        this.obstacles.push(this.tile(this.state.screenWidth*this.state.numObstacles+offset+unit*2,this.state.screenHeight-unit/2))
        this.obstacles.push(this.tile(this.state.screenWidth*this.state.numObstacles+offset+unit*3,this.state.screenHeight-unit/2))
        this.obstacles.push(<Goal height= {700} width= {50} xPos= {this.state.screenWidth*this.state.numObstacles+offset+unit*3} yPos= {this.state.screenHeight-750}/>)
        window.addEventListener('keydown', this.handleKeyDown)
        this.gameLoop()
    }

    generateObstacles(difficulty) {
        switch (difficulty) {
            case 1:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.plebianObstacles = [this.ob1(x),this.ob2(x), this.ob7(x)]
                    let index = Math.floor(Math.random()*this.plebianObstacles.length)
                    for (let j=0;j<this.plebianObstacles[index].length;j++)   
                        this.obstacles.push(this.plebianObstacles[index][j])
                }
                break
            case 2:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.easyObstacles = [this.ob1(x),this.ob2(x)]
                    let index = Math.floor(Math.random()*this.easyObstacles.length)
                    for (let j=0;j<this.easyObstacles[index].length;j++)   
                        this.obstacles.push(this.easyObstacles[index][j])
                }
                break
            case 3:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.mediumObstacles = [this.ob8(x)]
                    let index = Math.floor(Math.random()*this.mediumObstacles.length)
                    for (let j=0;j<this.mediumObstacles[index].length;j++)   
                        this.obstacles.push(this.mediumObstacles[index][j])
                }
                break
            case 4:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.hardObstacles = [this.ob4(x),this.ob5(x), this.ob6(x)]
                    let index = Math.floor(Math.random()*this.hardObstacles.length)
                    for (let j=0;j<this.hardObstacles[index].length;j++)   
                        this.obstacles.push(this.hardObstacles[index][j])
                }
                break;
            case 5:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.expertObstacles = [this.ob4(x), this.ob6(x)]
                    let index = Math.floor(Math.random()*this.expertObstacles.length)
                    for (let j=0;j<this.expertObstacles[index].length;j++)   
                        this.obstacles.push(this.expertObstacles[index][j])
                }
                break
        }
    }

    defaultStart() {
        let unit = this.state.screenWidth/16
        return [
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*8} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*9} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*10} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*11} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*12} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*13} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*14} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*15} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*16} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*17} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*18} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*19} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*20} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*21} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*22} yPos= {this.state.screenHeight-unit/2}/>,
            <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {unit*23} yPos= {this.state.screenHeight-unit/2}/>,
        ]
    }
    ob1(x) {
        let unit = this.state.screenWidth/16
        let h = this.state.screenHeight
        return [
            this.tile(x,h-unit/2),
            this.tile(x+unit,h-unit/2),
            <Spring height= {314} width= {50} xPos= {x+200} yPos= {h-100}/>,
            this.tile(x+1300,h-unit/2)
        ]
    }
    ob2(x) {
        let unit = this.state.screenWidth/16
        let h = this.state.screenHeight
        return [
            <Spring height= {314} width= {60} xPos= {x+200} yPos= {h-100}/>,
            this.tile(x+300,h-600),
            this.tile(x+400,h-600),
            this.tile(x+500,h-600),
            this.tile(x+600,h-600),
            this.tile(x+700,h-600),
            this.tile(x+(this.state.screenWidth/2),h-600),
            this.tile(x+900,h-600),
            this.tile(x+1000,h-600),
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+300} yPos = {h-(this.state.screenWidth/2)}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+300} yPos = {h-500}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+400} yPos = {h-500}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+500} yPos = {h-500}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+600} yPos = {h-500}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+700} yPos = {h-500}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+(this.state.screenWidth/2)} yPos = {h-500}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+900} yPos = {h-500}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+1000} yPos = {h-500}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+1400} yPos = {h-570}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+1400} yPos = {h-500}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+1400} yPos = {h-400}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+1400} yPos = {h-300}/>,
            <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x+1400} yPos = {h-200}/>,
            this.tile(x+1200,h-unit/2),
            this.tile(x+1300,h-unit/2),
            this.tile(x+1400,h-unit/2),
            this.tile(x+1500,h-unit/2),
            this.tile(x+this.state.screenWidth,h-unit/2),
        ]
    }
    ob3(x) {
        let unit = this.state.screenWidth/16
        let h = this.state.screenHeight
        return [
            this.tile(x+unit, h-unit/2),
            <Spring height= {314} width= {60} xPos= {x+400} yPos= {h-100}/>,
            this.spike(x+900,h-600),
            this.spike(x+900,h-(this.state.screenWidth/2)),
            this.spike(x+(this.state.screenWidth/2),h-600),
            this.spike(x+(this.state.screenWidth/2),h-800),
            this.tile(x+1300,h-unit/2),
            this.tile(x+1400,h-unit/2),
            this.tile(x+1500,h-unit/2),
            this.tile(x+this.state.screenWidth,h-unit/2),
        ]
    }
    ob4(x) {
        let unit = this.state.screenWidth/16
        let h = this.state.screenHeight
        return [
            this.tile(x+unit,h-unit/2),
            this.tile(x+400,h-unit/2),
            this.tile(x+(this.state.screenWidth/2),h-unit/2),
            this.tile(x+1200,h-unit/2),
            this.tile(x+this.state.screenWidth,h-unit/2),
            this.spike(x+400, h-300),
            this.spike(x+(this.state.screenWidth/2),h-300),
            this.spike(x+1200,h-300),
            this.spike(x+this.state.screenWidth,h-300),
            this.spike(x+400, h-600),
            this.spike(x+(this.state.screenWidth/2),h-600),
            this.spike(x+1200,h-600),
            this.spike(x+this.state.screenWidth,h-600)
        ]
    }
    ob5(x) {
        let unit = this.state.screenWidth/16
        let h = this.state.screenHeight
        return [
            this.tile(x+unit,h-unit/2),
            this.tile(x+400,h-unit/2),
            this.tile(x+(this.state.screenWidth/2),h-unit/2),
            this.tile(x+1200,h-unit/2),
            this.tile(x+this.state.screenWidth,h-unit/2),
            this.spike(x+300, h-300),
            this.spike(x+300, h-200),
            this.spike(x+500,h-300),
            this.spike(x+500, h-200),
            this.spike(x+700,h-300),
            this.spike(x+700,h-200),
            this.spike(x+900,h-300),
            this.spike(x+900,h-200),
            this.spike(x+1100, h-300),
            this.spike(x+1100, h-200),
            this.spike(x+1300,h-300),
            this.spike(x+1300, h-200),
            this.spike(x+1500,h-300),
            this.spike(x+1500,h-200),
        ]
    }
    ob6(x) {
        let unit = this.state.screenWidth/16
        let h = this.state.screenHeight
        return [
            this.spring(x+unit,h-100),
            this.tile(x+400,h-unit/2),
            this.tile(x+(this.state.screenWidth/2),h-unit/2),
            this.tile(x+1200,h-unit/2),
            this.tile(x+this.state.screenWidth,h-unit/2),
            this.spike(x+300, h-300),
            this.spike(x+300, h-200),
            this.spike(x+500,h-300),
            this.spike(x+500, h-200),
            this.spike(x+700,h-300),
            this.spike(x+700,h-200),
            this.spike(x+900,h-300),
            this.spike(x+900,h-200),
            this.spike(x+1100, h-300),
            this.spike(x+1100, h-200),
            this.spike(x+1300,h-300),
            this.spike(x+1300, h-200),
            this.spike(x+1500,h-300),
            this.spike(x+1500,h-200),
            this.spike(x+300, h-400),
            this.spike(x+500,h-400),
            this.spike(x+700,h-400),
            this.spike(x+900,h-400),
            this.spike(x+1100, h-400),
            this.spike(x+1300,h-400),
            this.spike(x+1500,h-400)
        ]
    }
    ob7(x) {
        let unit = this.state.screenWidth/16
        let h = this.state.screenHeight
        return [
            this.tile(x+300,h-700),
            this.tile(x+600,h-unit/2),
            this.tile(x+900,h-700),
            this.tile(x+1200,h-unit/2),
            this.tile(x+1500,h-700)
        ]
    }
    ob8(x) {
        let unit = this.state.screenWidth/16
        let h = this.state.screenHeight
        return [
            //this.movingTile(x+300,h-unit/2,4,10,0)
            
        ]
    }
    ob9(x) {
        
    }
    ob10(x) {

    }
    ob11(x) {

    }
    ob12(x) {
        
    }
    tile(x,y) {
        let unit = this.state.screenWidth/16
        return <Tile image= {this.state.tileImage} height= {unit} width= {unit} xPos= {x} yPos= {y}/>
    }
    spike(x,y) {
        let unit = this.state.screenWidth/16
        return <Spike image= {this.state.spikeImage} height= {unit} width= {unit} xPos= {x} yPos= {y}/>
    }
    spring(x,y) {
        let unit = this.state.screenWidth/16
        return <Spring height= {314} width= {60} xPos= {x} yPos= {y}/>
    }
    // movingTile(x,y,acceleration,xSpeed,ySpeed) {
    //     return <MovingTile image= {this.state.tileImage} height = {unit} width= {unit} xPosInit= {x} yPosInit= {y} xPos= {x} yPos= {y} acc= {acceleration} xSpeed= {xSpeed} ySpeed = {ySpeed}/>
    // }

    gameLoop() {
        let timeoutId = setTimeout(() => {
            if (this.state.qboxanim) this.setState({time2: 20000 - new Date().getTime() + this.state.time1})
            if (this.state.springanim && this.state.yPos < this.state.screenHeight/2) this.setState({springanim:false})
            if (this.state.deadanim && this.state.xPos > 700) this.setState({deadanim:false})
            if (this.state.time2 < 0) this.setState({qboxanim:false, xAcceleration: 4, ballsize: 40, gravity: this.state.difficulty/2})
            this.changeDirection()
            if (this.state.yPos > this.state.screenHeight-30 || this.state.died) this.resetGame()
            this.setState({ keyPressed: false, ballDirection: 'zero acceleration' })
            if (!this.state.determinedScreenDims)   {
                this.setState({
                    screenWidth: document.getElementById("fill_screen").clientWidth, 
                    screenHeight: document.getElementById("fill_screen").clientHeight,
                    determinedScreenDims: true,
                })
                this.setState({ballSize: this.state.screenHeight/25})
            }
            this.fall()
            if (!this.state.isGameOver) this.gameLoop()
          }, this.state.gameLoopTimeout)
        if (!this.state.isGameOver) this.setState({ timeoutId })
    }
    
    resetGame() {
        let attempts = this.state.attempts
        this.plebianObstacles = [[]]
        this.easyObstacles = [[]]
        this.mediumObstacles = [[]]
        this.hardObstacles = [[]]
        this.expertObstacles = [[]]
        this.obstacles= []
        this.generateObstacles(this.state.difficulty)
        let def = this.defaultStart()
        for (let i = 0; i < def.length; i++)  this.obstacles.push(def[i])
        let unit = this.state.screenWidth/16
        let offset = unit*8
        this.obstacles.push(this.tile(this.state.screenWidth*this.state.numObstacles+offset+unit,this.state.screenHeight-unit/2))
        this.obstacles.push(this.tile(this.state.screenWidth*this.state.numObstacles+offset+unit*2,this.state.screenHeight-unit/2))
        this.obstacles.push(this.tile(this.state.screenWidth*this.state.numObstacles+offset+unit*3,this.state.screenHeight-unit/2))
        this.obstacles.push(<Goal height= {700} width= {50} xPos= {this.state.screenWidth*this.state.numObstacles+offset+unit*3} yPos= {this.state.screenHeight-750}/>)
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
            deadanim: true,
            xAcceleration: 4,
            time1: 0,
            time2: 0,
            time: new Date().getTime(),
            died: false,
            determinedScreenDims:false,
        })
    }

    fall() {
        let grav = this.state.gravity
        let ball_speed = this.state.ballSpeedY
        let y = this.state.yPos
        if (this.isThereCollision(this.obstacles) && !this.state.bounced) {
            let type = this.state.collidedObj.type
            if (type === Tile) {
                ball_speed *= -1
                ball_speed += this.state.difficulty
                this.setState({bounced: true, ballSpeedY: ball_speed, yPos: y + ball_speed})
            }
            else if (type === QuestionBox && !this.state.qboxanim) {
                let rand = Math.floor(Math.random()*2)
                this.setState({qboxanim: true})
                if (this.qBoxImages[rand] === QBoxHandling) this.setState({qBoxImage: QBoxHandling, xAcceleration: 15, time1: new Date().getTime()})
                else if (this.qBoxImages[rand] === QBoxMiniBall) this.setState({qBoxImage: QBoxMiniBall, ballSize: 20, gravity: this.state.gravity*2/3, time1: new Date().getTime()})
            }
            else if (type === Spring) {
                let unit = this.state.screenWidth/16
                ball_speed = -16-grav*16
                this.setState({springanim: true, springPos: Math.round(this.state.xPos/unit)*unit+(this.state.screenWidth/2), bounced: true, ballSpeedY: ball_speed, yPos: y + ball_speed})
            }
            else if (type === Sword || type === Spike || type === Laser || type === Arrow) {
                this.setState({died:true})
            }
            else if (type === Goal) this.setState({isGameOver: true})
        }
        else if (!this.isThereCollision(this.obstacles) && this.state.bounced && !this.state.isGameOver) {
            this.setState({bounced: false})
        }
        if(!this.state.isGameOver && !this.state.died) this.setState({ballSpeedY: ball_speed + grav, yPos: y + ball_speed})
    }

    isThereCollision(arr) {
        let ball = {x: this.state.xPos + this.state.ballSize/2, y: this.state.yPos + this.state.ballSize, 
                    width: this.state.ballSize, height: this.state.ballSize}
        let collidedObj = arr.find(a => {
            if (a === undefined || a.props === undefined) return false
            let obstacle = {x: a.props.xPos - (this.state.screenWidth/2), y: a.props.yPos, width: a.props.width, height: a.props.height}
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
        if (this.state.xPos < -(this.state.screenWidth/2) && dir === 'left')
            ball_speed = 0
        let x = this.state.xPos + ball_speed
        if (this.state.xPos > -1*this.state.screenWidth/8 && !this.state.isGameOver) 
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
                <GameOver difficulty = {this.state.difficulty} time= {Math.round(new Date().getTime() - this.state.time)/1000}/>
            )
        }
        else {
            return(
                <div>
                    <div id = "background" style= {{left: -1*this.state.xPos/2, backgroundImage: 'url('+this.state.background+')'}}/>
                    <div id= "fill_screen" style= {{left: -1*this.state.xPos}}>
                        {this.obstacles}
                        {this.state.springanim ? <div className= "springanim" style= {{top: this.state.screenHeight-100, marginLeft: this.state.springPos, backgroundImage: 'url('+SpringImage+')'}}/>:<div/>}
                        <Ball image= {this.state.ballImage}
                        xPos= {(this.state.screenWidth/2) + this.state.xPos}
                        yPos={this.state.yPos}
                        height={this.state.ballSize}/>
                        <p className= "attempt" style= {{left: -1*this.state.xPos, marginTop: 60}}>Attempt: {this.state.attempts}</p>
                    </div>
                    <img src= {ProgressBar} style= {{position: 'absolute', left: '37.5%', width: '25%', top: '2%'}}/>
                    <img src= {this.state.ballBarImage} style= {{position: 'absolute', left: 37.5+((this.state.xPos)/(this.state.numObstacles*this.state.screenWidth))*25+'%', width: '20px' ,top: '1.6%'}}/>
                    {this.state.qboxanim ? <p className= "time">{this.state.time2}</p>:<p/>}
                    {this.state.qboxanim ? <div className= "qboxanim" style= {{backgroundImage: 'url('+this.state.qBoxImage+')'}}/>:<div/>}
                    {this.state.deadanim ? <div className= "qboxanim" style= {{backgroundImage: 'url('+Ouch+')'}}/>:<div/>}
                </div>
            )
        }
    }
}

export default BounceGame