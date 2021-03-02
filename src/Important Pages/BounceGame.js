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
            numObstacles: props.numObstacles,
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
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let offset = unitX*8
        this.obstacles.push(this.tile(this.state.screenWidth*this.state.numObstacles+offset,this.state.screenHeight-unitY))
        this.obstacles.push(this.tile(this.state.screenWidth*this.state.numObstacles+offset+unitX,this.state.screenHeight-unitY))
        this.obstacles.push(this.tile(this.state.screenWidth*this.state.numObstacles+offset+unitX*2,this.state.screenHeight-unitY))
        this.obstacles.push(<Goal height= {unitY*15} width= {unitX/2} xPos= {this.state.screenWidth*this.state.numObstacles+offset+unitX*2} yPos= {this.state.screenHeight-(unitY*16)}/>)
        window.addEventListener('keydown', this.handleKeyDown)
        this.gameLoop()
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
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let offset = unitX*8
        this.obstacles.push(this.tile(this.state.screenWidth*this.state.numObstacles+offset,this.state.screenHeight-unitY))
        this.obstacles.push(this.tile(this.state.screenWidth*this.state.numObstacles+offset+unitX,this.state.screenHeight-unitY))
        this.obstacles.push(this.tile(this.state.screenWidth*this.state.numObstacles+offset+unitX*2,this.state.screenHeight-unitY))
        this.obstacles.push(<Goal height= {unitY*15} width= {unitX/2} xPos= {this.state.screenWidth*this.state.numObstacles+offset+unitX*2} yPos= {this.state.screenHeight-(unitY*16)}/>)
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

    generateObstacles(difficulty) {
        switch (difficulty) {
            case 1:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.plebianObstacles = [this.ob1(x), this.ob7(x)]
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
                    this.mediumObstacles = [this.ob2(x),this.ob8(x)]
                    let index = Math.floor(Math.random()*this.mediumObstacles.length)
                    for (let j=0;j<this.mediumObstacles[index].length;j++)   
                        this.obstacles.push(this.mediumObstacles[index][j])
                }
                break
            case 4:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.hardObstacles = [this.ob3(x),this.ob4(x),this.ob5(x), this.ob6(x)]
                    let index = Math.floor(Math.random()*this.hardObstacles.length)
                    for (let j=0;j<this.hardObstacles[index].length;j++)   
                        this.obstacles.push(this.hardObstacles[index][j])
                }
                break;
            case 5:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.expertObstacles = [this.ob3(x),this.ob4(x), this.ob6(x)]
                    let index = Math.floor(Math.random()*this.expertObstacles.length)
                    for (let j=0;j<this.expertObstacles[index].length;j++)   
                        this.obstacles.push(this.expertObstacles[index][j])
                }
                break
        }
    }

    defaultStart() {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(unitX*8),
            this.tile(unitX*9),
            this.tile(unitX*10),
            this.tile(unitX*11),
            this.tile(unitX*12),
            this.tile(unitX*13),
            this.tile(unitX*14),
            this.tile(unitX*15),
            this.tile(unitX*16),
            this.tile(unitX*17),
            this.tile(unitX*18),
            this.tile(unitX*19),
            this.tile(unitX*20),
            this.tile(unitX*21),
            this.tile(unitX*22),
            this.tile(unitX*23),
        ]
    } //default: line of 16 tiles
    ob1(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x),
            this.tile(x+unitX),
            this.spring(x+unitX*2),
            this.tile(x+unitX*9)
        ]
    } //ob1: Spring with far-off block
    ob2(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.spring(x+unitX*2),
            this.tile2(x+unitX*3,h-unitY*12),
            this.tile2(x+unitX*4,h-unitY*12),
            this.tile2(x+unitX*5,h-unitY*12),
            this.tile2(x+unitX*6,h-unitY*12),
            this.tile2(x+unitX*7,h-unitY*12),
            this.tile2(x+unitX*8,h-unitY*12),
            this.tile2(x+unitX*9,h-unitY*12),
            this.tile2(x+unitX*10,h-unitY*12),
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*3} yPos = {h-unitY*16}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*3} yPos = {h-unitY*11}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*4} yPos = {h-unitY*11}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*5} yPos = {h-unitY*11}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*6} yPos = {h-unitY*11}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*7} yPos = {h-unitY*11}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*8} yPos = {h-unitY*11}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*9} yPos = {h-unitY*11}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*10} yPos = {h-unitY*11}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*14} yPos = {h-unitY*11.4}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*14} yPos = {h-unitY*10}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*14} yPos = {h-unitY*8}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*14} yPos = {h-unitY*6}/>,
            <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x+unitX*14} yPos = {h-unitY*4}/>,
            this.tile(x+unitX*12),
            this.tile(x+unitX*13),
            this.tile(x+unitX*14),
            this.tile(x+unitX*15),
            this.tile(x+unitX*16),
        ]
    } //ob2: Catwalk with spikes under it
    ob3(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.spring(x+unitX*4),
            this.spike(x+unitX*9,h-unitY*12),
            this.spike(x+unitX*9,h-unitY*18),
            this.spike(x+unitX*8,h-unitY*12),
            this.spike(x+unitX*8,h-unitY*18),
            this.tile(x+unitX*13),
            this.tile(x+unitX*14),
            this.tile(x+unitX*15),
            this.tile(x+unitX*16),
        ]
    } //ob3: Spring through spikes
    ob4(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x+unitX),
            this.tile(x+unitX*4),
            this.tile(x+unitX*8),
            this.tile(x+unitX*12),
            this.tile(x+unitX*16),
            this.spike(x+unitX*4, h-unitY*6),
            this.spike(x+unitX*8,h-unitY*6),
            this.spike(x+unitX*12,h-unitY*6),
            this.spike(x+unitX*16,h-unitY*6),
            this.spike(x+unitX*4, h-unitY*12),
            this.spike(x+unitX*8,h-unitY*12),
            this.spike(x+unitX*12,h-unitY*12),
            this.spike(x+unitX*16,h-unitY*12)
        ]
    } //ob4: tiles with two spikes over them. Tough
    ob5(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x+unitX),
            this.tile(x+unitX*4),
            this.tile(x+unitX*8),
            this.tile(x+unitX*12),
            this.tile(x+unitX*16),
            this.spike(x+unitX*3, h-unitY*6),
            this.spike(x+unitX*3, h-unitY*4),
            this.spike(x+unitX*5,h-unitY*6),
            this.spike(x+unitX*5, h-unitY*4),
            this.spike(x+unitX*7,h-unitY*6),
            this.spike(x+unitX*7,h-unitY*4),
            this.spike(x+unitX*9,h-unitY*6),
            this.spike(x+unitX*9,h-unitY*4),
            this.spike(x+unitX*11, h-unitY*6),
            this.spike(x+unitX*11, h-unitY*4),
            this.spike(x+unitX*13,h-unitY*6),
            this.spike(x+unitX*13, h-unitY*4),
            this.spike(x+unitX*15,h-unitY*6),
            this.spike(x+unitX*15,h-unitY*4),
        ]
    } //ob5: Spikes surrounding tiles vertically NO SPRING
    ob6(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.spring(x+unitX),
            this.tile(x+unitX*4),
            this.tile(x+unitX*8),
            this.tile(x+unitX*12),
            this.tile(x+unitX*8),
            this.spike(x+unitX*3, h-unitY*6),
            this.spike(x+unitX*3, h-unitY*4),
            this.spike(x+unitX*5,h-unitY*6),
            this.spike(x+unitX*5, h-unitY*4),
            this.spike(x+unitX*7,h-unitY*6),
            this.spike(x+unitX*7,h-unitY*4),
            this.spike(x+unitX*9,h-unitY*6),
            this.spike(x+unitX*9,h-unitY*4),
            this.spike(x+unitX*11, h-unitY*6),
            this.spike(x+unitX*11, h-unitY*4),
            this.spike(x+unitX*13,h-unitY*6),
            this.spike(x+unitX*13, h-unitY*4),
            this.spike(x+unitX*15,h-unitY*6),
            this.spike(x+unitX*15,h-unitY*4),
            this.spike(x+unitX*3, h-unitY*8),
            this.spike(x+unitX*5,h-unitY*8),
            this.spike(x+unitX*7,h-unitY*8),
            this.spike(x+unitX*9,h-unitY*8),
            this.spike(x+unitX*11, h-unitY*8),
            this.spike(x+unitX*13,h-unitY*8),
            this.spike(x+unitX*15,h-unitY*8)
        ]
    } //ob6: Spikes surrounding tiles vertically
    ob7(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile2(x+unitX*3,h-unitY*14),
            this.tile(x+unitX*12),
            this.tile2(x+unitX*9,h-unitY*14),
            this.tile2(x+unitX*15,h-unitY*14)
        ]
    } //ob7: Tiles spread around. Plebian
    ob8(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.spring(x+unitX*2)

            
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
    tile2(x,y) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        return <Tile image= {this.state.tileImage} height= {unitY} width= {unitX} xPos= {x} yPos= {y}/>
    }
    tile(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        return <Tile image= {this.state.tileImage} height= {unitY} width= {unitX} xPos= {x} yPos= {this.state.screenHeight-unitY}/>
    }
    spike(x,y) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        return <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x} yPos= {y}/>
    }
    spring(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight           
        return <Spring height= {unitY*6} width= {unitX*0.6} xPos= {x} yPos= {h-unitY*2}/>
    }

    gameLoop() {
        let timeoutId = setTimeout(() => {
            if (this.state.qboxanim) this.setState({time2: 20000 - new Date().getTime() + this.state.time1})
            if (this.state.springanim && this.state.ballSpeedY > 0) this.setState({springanim:false})
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
                let unitX = this.state.screenWidth/16
                ball_speed = -17-grav*17
                this.setState({springanim: true, springPos: Math.round(this.state.xPos/unitX)*unitX+(this.state.screenWidth/2), bounced: true, ballSpeedY: ball_speed, yPos: y + ball_speed})
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
                <GameOver difficulty = {this.state.difficulty}
                    time= {Math.round(new Date().getTime() - this.state.time)/1000}
                    length= {this.state.numObstacles+' obstacles'}/>
            )
        }
        else {
            return(
                <div>
                    <div id = "background" style= {{left: -1*this.state.xPos/2, backgroundImage: 'url('+this.state.background+')'}}/>
                    <div id= "fill_screen" style= {{left: -1*this.state.xPos}}>
                        {this.obstacles}
                        {this.state.springanim ? <div className= "springanim" style= {{top: this.state.screenHeight-this.state.screenHeight*2/20, marginLeft: this.state.springPos, backgroundImage: 'url('+SpringImage+')', height: this.state.screenHeight*6/20, backgrondSize: 'aut0 100%', backgroundRepeat: 'no-repeat'}}/>:<div/>}
                        <Ball image= {this.state.ballImage}
                        xPos= {(this.state.screenWidth/2) + this.state.xPos}
                        yPos={this.state.yPos}
                        height={this.state.ballSize}/>
                        <p className= "attempt" style= {{left: -1*this.state.xPos, marginTop: 60}}>Attempt: {this.state.attempts}</p>
                    </div>
                    <img src= {ProgressBar} style= {{position: 'absolute', left: '37.5%', width: '25%', top: 15}}/>
                    <img src= {this.state.ballBarImage} style= {{position: 'absolute', left: 37.5+((this.state.xPos)/(this.state.numObstacles*this.state.screenWidth+this.state.screenWidth/5))*24+'%', width: '20px' ,top: 13}}/>
                    {this.state.qboxanim ? <p className= "time">{this.state.time2}</p>:<p/>}
                    {this.state.qboxanim ? <div className= "qboxanim" style= {{backgroundImage: 'url('+this.state.qBoxImage+')'}}/>:<div/>}
                    {this.state.deadanim ? <div className= "qboxanim" style= {{backgroundImage: 'url('+Ouch+')'}}/>:<div/>}
                </div>
            )
        }
    }
}

export default BounceGame