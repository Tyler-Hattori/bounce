import './BounceGame.css'
import React from 'react'
import GameOver from './GameOver.js'
import Ball from '../Components/Ball'
import Tile from '../Components/Tile'
import QuestionBox from '../Components/QuestionBox'
import QBoxHandling from '../Components/Images/question_box_handling.png'
import QBoxMiniBall from '../Components/Images/question_box_mini_ball.png'
import QBoxSpeed from '../Components/Images/question_box_speed.png'
import QBoxHeavy from '../Components/Images/question_box_heavy.png'
import QBoxFat from '../Components/Images/question_box_fat.png'
import QBoxNonStop from '../Components/Images/question_box_nonstop.png'
import QBoxSlow from '../Components/Images/question_box_slow.png'
import QBoxMirror from '../Components/Images/question_box_mirrored.png'
import Spring from '../Components/Spring'
import SpringImage from '../Components/Images/spring.png'
import Laser from '../Components/Laser'
import Arrow from '../Components/Arrow'
import Sword from '../Components/Sword'
import Spike from '../Components/Spike'
import Goal from '../Components/Goal'
import Ouch from '../Components/Images/ouch.png'
import ProgressBar from '../Components/Images/progress_bar.png'

class BounceGame extends React.Component {
    constructor(props) {
        super(props)
        
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleTouch = this.handleTouch.bind(this)

        this.state = {
            screenWidth: 1620,
            screenHeight: 1009,
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
            spikeImage: props.spikeImage,
            numObstacles: props.numObstacles,
            springPos: 0,
            died: false,
            clientX: 0,
            nonStop: false,
            mirror: false
        }

    }
    
    componentDidMount() {
        this.plebianObstacles = [[]]
        this.easyObstacles = [[]]
        this.mediumObstacles = [[]]
        this.hardObstacles = [[]]
        this.expertObstacles = [[]]
        this.obstacles = []
        this.qBoxImages = [QBoxHandling,QBoxMiniBall,QBoxFat,QBoxHeavy,QBoxMirror,QBoxNonStop,QBoxSpeed,QBoxSlow]
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
        window.addEventListener('touchstart', this.handleTouch)
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
            nonStop: false,
            time1: 0,
            time2: 0,
            time: new Date().getTime(),
            died: false,
            determinedScreenDims:false,
            mirror: false
        })
    }

    generateObstacles(difficulty) {
        switch (difficulty) {
            case 1:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.plebianObstacles = [this.ob1(x),this.ob7(x),this.ob9(x),this.ob14(x),this.ob15(x),this.ob16(x),this.ob17(x)]
                    let index = Math.floor(Math.random()*this.plebianObstacles.length)
                    for (let j=0;j<this.plebianObstacles[index].length;j++)   
                        this.obstacles.push(this.plebianObstacles[index][j])
                }
                break
            case 2:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.easyObstacles = [this.ob1(x),this.ob2(x),this.ob7(x),this.ob13(x),this.ob14(x),this.ob15(x),this.ob16(x),this.ob17(x),this.ob18(x)]
                    let index = Math.floor(Math.random()*this.easyObstacles.length)
                    for (let j=0;j<this.easyObstacles[index].length;j++)   
                        this.obstacles.push(this.easyObstacles[index][j])
                }
                break
            case 3:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.mediumObstacles = [this.ob20(x),this.ob19(x),this.ob2(x),this.ob8(x),this.ob11(x),this.ob12(x),this.ob13(x),this.ob15(x),this.ob16(),this.ob18(x)]
                    let index = Math.floor(Math.random()*this.mediumObstacles.length)
                    for (let j=0;j<this.mediumObstacles[index].length;j++)   
                        this.obstacles.push(this.mediumObstacles[index][j])
                }
                break
            case 4:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.hardObstacles = [this.ob3(x),this.ob4(x),this.ob5(x), this.ob6(x),this.ob8(x),this.ob11(x),this.ob12(x),this.ob19(x),this.ob22(x)]
                    let index = Math.floor(Math.random()*this.hardObstacles.length)
                    for (let j=0;j<this.hardObstacles[index].length;j++)   
                        this.obstacles.push(this.hardObstacles[index][j])
                }
                break;
            case 5:
                for (let i = 1; i < this.state.numObstacles; i++) {
                    let x = i*this.state.screenWidth + (this.state.screenWidth/2)
                    this.expertObstacles = [/*this.ob3(x),this.ob4(x), this.ob6(x),this.ob10(x),*/this.ob21(x),this.ob22(x)]
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
            this.spike(x+unitX*8,h-12),
            this.tile(x+unitX*9),
            this.tile(x+unitX*8),
            this.tile(x+unitX*7),
            this.tile(x+unitX*6),
            this.questionbox(x+unitX*6,h-unitY*14)
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
            this.questionbox(x+unitX*8,h-unitY*8),
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
    } //ob2: Catwalk with spikes under it, spring
    ob3(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.spring(x+unitX*4),
            this.questionbox(x+unitX*4,h-unitY*16),
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
    } //ob4: tiles with two spikes over them
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
    } //ob6: Spikes surrounding tiles vertically, spring
    ob7(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.spring(x+unitX),
            this.tile2(x+unitX*6,h-unitY*13),
            this.tile(x+unitX*12),
            this.tile(x+unitX*11),
            this.tile(x+unitX*13),
            <QuestionBox xPos= {x+unitX*12} yPos= {h-unitY*7} height= {unitY} width= {unitY}/>,
            this.tile2(x+unitX*9,h-unitY*13),
            this.tile2(x+unitX*15,h-unitY*13)
        ]
    } //ob7: Tiles spread around, spring
    ob8(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.spring(x+unitX*2),
            this.questionbox(x+unitX*9,h-unitY*10),
            this.tile(x+unitX*11),
            this.tile(x+unitX*12),
            this.tile(x+unitX*13),
        ]
    } //ob8: Spring with questionbox
    ob9(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x+100),
            this.tile(x+300),
            this.tile(x+600),
            this.tile(x+1000),
            this.tile(x+1500)
        ]
    } //Spread out ground tiles
    ob10(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x),
            this.spring(x+unitX),
            this.spike(x+unitX*3,h-unitY*14),
            this.spike(x+unitX*3,h-unitY*10),
            this.tile(x+unitX*6),
            this.spike(x+unitX*9,h-unitY*12),
            this.spike(x+unitX*9,h-unitY*8),
            this.tile(x+unitX*12),
            this.spike(x+unitX*15,h-unitY*10),
            this.spike(x+unitX*15,h-unitY*6)
        ]
    } //ob10: jump through spikes, spring
    ob11(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.spike(x,h-8),
            this.tile(x+unitX),
            this.questionbox(x+unitX*2,h-unitY*10),
            this.tile(x+unitX*2),
            this.tile(x+unitX*3),
            this.tile(x+unitX*6),
            this.tile(x+unitX*7),
            this.tile(x+unitX*8),
            this.tile(x+unitX*9),
            this.tile(x+unitX*10),
            this.tile(x+unitX*11),
            this.tile(x+unitX*12),
            this.tile(x+unitX*13),
            this.tile(x+unitX*14),
            this.tile(x+unitX*15),
            this.tile(x+unitX*16),
            this.spike(x+unitX*7,h-unitY*9),
            this.spike(x+unitX*9,h-unitY*9),
            this.spike(x+unitX*11,h-unitY*9),
            this.spike(x+unitX*13,h-unitY*9),
            this.spike(x+unitX*15,h-unitY*9)
        ]
    } //ob11: avoid spikes on up bounce
    ob12(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x+unitX*3),
            this.tile2(x+unitX*5,h-unitY*5),
            this.spike(x+unitX*4,h-unitY*5),
            this.tile2(x+unitX*7,h-unitY*10),
            this.spike(x+unitX*6,h-unitY*10),
            this.tile(x+unitX*10),
            this.questionbox(x+unitX*10,h-unitY*10),
            this.tile2(x+unitX*10,h-unitY*14),
            this.spike(x+unitX*9,h-unitY*14),
            this.spike(x+unitX*11,h-unitY*14),
            this.tile2(x+unitX*13,h-unitY*10),
            this.spike(x+unitX*14,h-unitY*10),
            this.tile2(x+unitX*15,h-unitY*5),
            this.spike(x+unitX*16,h-unitY*5)
        ]
    } //ob12: Stairstep
    ob13(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x+unitX*2),
            this.spring(x+unitX*3),
            this.tile(x+unitX*7/2),
            this.questionbox(x+unitX*3,h-unitY*12),
            this.spike(x+unitX*7,h-unitY*9),
            this.spike(x+unitX*8,h-unitY*9),
            this.spike(x+unitX*9,h-unitY*9),
            this.spike(x+unitX*10,h-unitY*9),
            this.spring(x+unitX*11),
            this.tile(x+unitX*23/2),
            this.spike(x+unitX*12,h-unitY*9),
            this.spike(x+unitX*13,h-unitY*9),
            this.spike(x+unitX*14,h-unitY*9),
            this.spike(x+unitX*15,h-unitY*9)
        ]
    } //ob13: Leap, spring
    ob14(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x),
            this.tile(x+unitX),
            this.tile2(x+unitX*8,h-unitY*10),
            this.tile2(x+unitX*9,h-unitY*10),
            this.tile2(x+unitX*10,h-unitY*10),
            this.tile(x+unitX*14),
            this.tile(x+unitX*15),
            this.tile(x+unitX*16),
            this.spike(x+unitX*9,h-unitY*13),
            this.spike(x+unitX*15,h-unitY*8)
        ]
    } //ob14: One raised platform
    ob15(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.spring(x+unitX*6),
            this.spike(x+unitX*6,h-unitY*14),
            this.spike(x+unitX*5,h-unitY*14),
            this.spike(x+unitX*7,h-unitY*14),
            this.tile(x),
            this.tile(x+unitX),
            this.tile(x+unitX*10),
            this.tile(x+unitX*11),
            this.tile(x+unitX*12)
        ]
    } //ob15: spring with spikes over it
    ob16(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x),
            this.spring(x+unitX),
            this.spike(x+unitX*2,h-unitY*10),
            this.tile(x+unitX*4),
            this.spike(x+unitX*6,h-unitY*10),
            this.tile(x+unitX*8),
            this.spike(x+unitX*10,h-unitY*10),
            this.tile(x+unitX*12),
            this.spike(x+unitX*14,h-unitY*10),
            this.tile(x+unitX*16),
        ]
    } //ob16: bounce over spikes to get to tiles, spring
    ob17(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x+unitX*2),
            this.tile(x+unitX*3),
            this.tile2(x+unitX*5,h-unitY*4),
            this.tile2(x+unitX*6,h-unitY*4),
            this.tile2(x+unitX*8,h-unitY*8),
            this.tile2(x+unitX*9,h-unitY*8),
            this.tile2(x+unitX*11,h-unitY*12),
            this.tile2(x+unitX*12,h-unitY*12),
            this.spike(x+unitX*15,h-unitY*12),
            this.spike(x+unitX*5,h-unitY*2),
            this.spike(x+unitX*8,h-unitY*6),
            this.spike(x+unitX*11,h-unitY*10),
        ]
    } //ob17: stairstep pairs of tiles going up only
    ob18(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x),
            this.tile(x+unitX),
            this.tile(x+unitX*3),
            this.tile(x+unitX*4),
            this.tile(x+unitX*6),
            this.tile(x+unitX*7),
            this.tile(x+unitX*9),
            this.tile(x+unitX*10),
            this.tile(x+unitX*12),
            this.tile(x+unitX*13),
            this.tile(x+unitX*15),
            this.tile(x+unitX*16),
            this.spike(x+unitX*2,h-unitY*6),
            this.spike(x+unitX*2,h-unitY*14),
            this.spike(x+unitX*5,h-unitY*6),
            this.spike(x+unitX*5,h-unitY*14),
            this.spike(x+unitX*8,h-unitY*6),
            this.spike(x+unitX*8,h-unitY*14),
            this.spike(x+unitX*11,h-unitY*6),
            this.spike(x+unitX*11,h-unitY*14),
            this.spike(x+unitX*14,h-unitY*6),
            this.spike(x+unitX*14,h-unitY*14),
            this.questionbox(x+unitX*8,h-unitY*10)
        ]
    } //ob18: bounce through spikes spread far apart
    ob19(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x),
            this.tile(x+unitX),
            this.tile(x+unitX*4),
            this.tile(x+unitX*3),
            this.tile(x+unitX*6),
            this.tile(x+unitX*7),
            this.tile(x+unitX*9),
            this.tile(x+unitX*10),
            this.tile(x+unitX*12),
            this.tile(x+unitX*13),
            this.tile(x+unitX*15),
            this.tile(x+unitX*16),
            this.spike(x+unitX*2,h-unitY*3),
            this.spike(x+unitX*2,h-unitY*6),
            this.spike(x+unitX*2,h-unitY*9),
            this.laser(x+unitX*2,h-unitY*12,"l1"),
            this.spike(x+unitX*2,h-unitY*15),
            this.spike(x+unitX*5,h-unitY*3),
            this.spike(x+unitX*5,h-unitY*6),
            this.laser(x+unitX*5,h-unitY*9,"l2"),
            this.spike(x+unitX*5,h-unitY*12),
            this.spike(x+unitX*5,h-unitY*15),
            this.spike(x+unitX*8,h-unitY*3),
            this.spike(x+unitX*8,h-unitY*6),
            this.laser(x+unitX*8,h-unitY*9,"l3"),
            this.spike(x+unitX*8,h-unitY*12),
            this.spike(x+unitX*8,h-unitY*15),
            this.laser(x+unitX*11,h-unitY*3,"l4"),
            this.spike(x+unitX*11,h-unitY*6),
            this.spike(x+unitX*11,h-unitY*9),
            this.spike(x+unitX*11,h-unitY*12),
            this.spike(x+unitX*11,h-unitY*15),
            this.spike(x+unitX*14,h-unitY*3),
            this.spike(x+unitX*14,h-unitY*6),
            this.spike(x+unitX*14,h-unitY*9),
            this.spike(x+unitX*14,h-unitY*12),
            this.spike(x+unitX*14,h-unitY*15)
        ]
    } //spike walls with laser
    ob20(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.spring(x),
            this.tile2(x+unitX,h-unitY*12),
            this.tile2(x+unitX*2,h-unitY*12),
            this.tile2(x+unitX*5,h-unitY*8),
            this.tile2(x+unitX*6,h-unitY*8),
            this.tile2(x+unitX*9,h-unitY*4),
            this.tile2(x+unitX*10,h-unitY*4),
            this.tile2(x+unitX*13,h-unitY*2),
            this.tile2(x+unitX*14,h-unitY*2),
            this.laser(x+unitX*3,h-unitY*14,"l5"),
            this.laser(x+unitX*7,h-unitY*13,"l6"),
            this.laser(x+unitX*11,h-unitY*12,"l7"),
            this.laser(x+unitX*15,h-unitY*11,"l8")
        ]
    } //spring with lasers (l8)
    ob21(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.spring(x),
            this.laser(x,h-unitY*4,"l9"),
            this.laser(x+unitX*2,h-unitY*8,"l10"),
            this.spike(x+unitX*7,h-unitY*6),
            this.spike(x+unitX*8,h-unitY*6),
            this.spike(x+unitX*10,h-unitY*6),
            this.spike(x+unitX*11,h-unitY*6),
            this.tile(x+unitX*9),
            this.laser(x+unitX*13,h-unitY*5,"l11"),
            this.laser(x+unitX*14,h-unitY*5,"l12"),
            this.laser(x+unitX*15,h-unitY*5,"l13"),
            this.tile(x+unitX*14)
        ]
    } //spring aim between spikes avoid laser (l13)
    ob22(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.tile(x),
            this.tile(x+unitX),
            this.tile(x+unitX*2),
            this.questionbox(x+unitX,h-unitY*10),
            this.laser(x+unitX*9,h-unitY*12,"l14"),
            this.laser(x+unitX*9,h-unitY*9,"l15"),
            this.laser(x+unitX*9,h-unitY*6,"l16"),
            this.laser(x+unitX*9,h-unitY*3,"l17"),
            this.laser(x+unitX*9,h-unitY*15,"l18"),
            this.tile2(x+unitX*14,h-unitY*2),
        ]
    } //ob22: qbox with column of lasers
    ob23(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight
        return [
            this.spring(x),
            this.tile2(x+unitX,h-unitY*10),
            this.tile2(x+unitX*2,h-unitY*10),
            this.tile2(x+unitX*3,h-unitY*10),
            this.tile2(x+unitX*4,h-unitY*10),
            this.tile2(x+unitX*5,h-unitY*10),
            this.tile2(x+unitX*6,h-unitY*10),
            this.tile2(x+unitX*7,h-unitY*10),
            this.tile2(x+unitX*8,h-unitY*10),
            this.tile2(x+unitX*9,h-unitY*10),
            this.tile2(x+unitX*10,h-unitY*10),
        ]
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
        return <Spike image= {this.state.spikeImage} height= {unitX} width= {unitX} xPos= {x} yPos= {y}/>
    }
    spring(x) {
        let unitX = this.state.screenWidth/16
        let unitY = this.state.screenHeight/20
        let h = this.state.screenHeight           
        return <Spring height= {unitY*6} width= {unitX*0.6} xPos= {x} yPos= {h-unitY*2}/>
    }
    questionbox(x,y) {
        let unitY = this.state.screenHeight/20
        return <QuestionBox xPos= {x} yPos= {y} width= {unitY} height= {unitY}/>
    }
    laser(x,y,id) {
        let unitX = this.state.screenWidth/16
        return <Laser laserImage= {this.state.spikeImage} id= {id} xPos= {x} yPos= {y} width= {unitX} height= {unitX}/>
    }

    gameLoop() {
        let timeoutId = setTimeout(() => {
            if (this.state.qboxanim) this.setState({time2: 20000 - new Date().getTime() + this.state.time1})
            if (this.state.springanim && this.state.ballSpeedY > 0) this.setState({springanim:false})
            if (this.state.deadanim && this.state.xPos > 700) this.setState({deadanim:false})
            if (this.state.time2 <= 0) this.setState({
                qboxanim:false, 
                xAcceleration: 4, 
                ballsize: this.state.screenHeight/25, 
                gravity: this.state.difficulty/2,
                maxSpeed: 30,
                nonStop: false,
                mirror: false})
            this.changeDirection()
            if (!this.state.nonStop) this.setState({ keyPressed: false, ballDirection: 'zero acceleration' })
            if (this.state.yPos > this.state.screenHeight || this.state.died) this.resetGame()
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
                let rand = Math.floor(Math.random()*8)
                this.setState({qboxanim: true})
                if (this.qBoxImages[rand] === QBoxHandling) this.setState({qBoxImage: QBoxHandling, xAcceleration: 15, time1: new Date().getTime()})
                else if (this.qBoxImages[rand] === QBoxMiniBall) this.setState({qBoxImage: QBoxMiniBall, ballSize: this.state.screenHeight/35, gravity: this.state.gravity*2/3, time1: new Date().getTime()})
                else if (this.qBoxImages[rand] === QBoxSpeed) this.setState({qBoxImage: QBoxSpeed, maxSpeed: 45, time1: new Date().getTime()})
                else if (this.qBoxImages[rand] === QBoxHeavy) this.setState({qBoxImage: QBoxHeavy, gravity: this.state.gravity*2, time1: new Date().getTime()})
                else if (this.qBoxImages[rand] === QBoxFat) this.setState({qBoxImage: QBoxFat, gravity: this.state.gravity*3/2, ballSize: this.state.screenHeight/15, time1: new Date().getTime()})
                else if (this.qBoxImages[rand] === QBoxNonStop) this.setState({qBoxImage: QBoxNonStop, nonStop: true, time1: new Date().getTime()})
                else if (this.qBoxImages[rand] === QBoxSlow) this.setState({qBoxImage: QBoxSlow, xAcceleration: 1, maxSpeed: 25, time1: new Date().getTime()})
                else if (this.qBoxImages[rand] === QBoxMirror) this.setState({qBoxImage: QBoxMirror, mirror: true, time1: new Date().getTime()})
            }
            else if (type === Spring) {
                let unitX = this.state.screenWidth/16
                ball_speed = -17-grav*16
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
            if (a.type === Laser && Math.floor((new Date().getTime() - this.state.time)/3000) % 2==0) {
                document.getElementById(a.props.id).style.opacity = 0
                return false
            }
            else if (a.type === Laser) document.getElementById(a.props.id).style.opacity = 1
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
                if (this.state.mirror) this.setState({ballDirection: 'right'})
                else this.setState({ ballDirection: 'left' })
                break
            case 39:
                if (this.state.mirror) this.setState({ballDirection: 'left'})
                else this.setState({ ballDirection: 'right' })
                break
        }
        this.setState({
            keyPressed: true
        })
    }
    handleTouch(event) {
        if (event.changedTouches[0].clientX > this.state.screenWidth/2)
            this.setState({ballDirection:'right'})
        else if (event.changedTouches[0].clientX < this.state.screenWidth/2){
            this.setState({ballDireciton: 'left'})
            alert(this.state.ballDirection)
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
                    length= {this.state.numObstacles+' obstacles'}
                    attempts= {this.state.attempts}/>
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
                    {this.state.qboxanim ? <p className= "time">{this.state.time2/1000}</p>:<p/>}
                    {this.state.qboxanim ? <div className= "qboxanim" style= {{backgroundImage: 'url('+this.state.qBoxImage+')'}}/>:<div/>}
                    {this.state.deadanim ? <div className= "qboxanim" style= {{backgroundImage: 'url('+Ouch+')'}}/>:<div/>}
                </div>
            )
        }
    }
}

export default BounceGame