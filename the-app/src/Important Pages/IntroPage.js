import React from 'react'
import BounceGame from './BounceGame.js'
import LoginLogout from '../LoginLogout.js'
import './IntroPage.css'
import PlebianBackground from '../Backgrounds/orange.jpg'
import EasyBackground from '../Backgrounds/forest_resized.jpg'
import MediumBackground from '../Backgrounds/sunset.jpg'
import HardBackground from '../Backgrounds/desert.jpg'
import ExpertBackground from '../Backgrounds/space.jpg'
import Tile1 from '../Components/Images/tile1.jpg'
import Tile2 from '../Components/Images/tile2.jpg'
import Tile3 from '../Components/Images/tile3.jpg'
import Tile4 from '../Components/Images/tile4.jpg'
import Tile5 from '../Components/Images/tile5.jpg'
import Ball1 from '../Components/Images/baseball.png'
import Ball2 from '../Components/Images/basketball.png'
import Ball3 from '../Components/Images/beachball.png'
import Ball4 from '../Components/Images/bowlingball.png'
import Ball5 from '../Components/Images/poolball.png'
import Ball6 from '../Components/Images/tennisball.png'
import Ball7 from '../Components/Images/volleyball.png'
import BallBar1 from '../Components/Images/baseball_bar.png'
import BallBar2 from '../Components/Images/basketball_bar.png'
import BallBar3 from '../Components/Images/beachball_bar.png'
import BallBar4 from '../Components/Images/bowlingball_bar.png'
import BallBar5 from '../Components/Images/poolball_bar.png'
import BallBar6 from '../Components/Images/tennisball_bar.png'
import BallBar7 from '../Components/Images/volleyball_bar.png'
import database from '../firebase'


class IntroPage extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            selectionsSet: false,
            selectedDifficulty: false,
            selectedBall: false,
            background: PlebianBackground,
            ballImage: Ball1,
            ballBarImage: BallBar1,
            difficulty: 0,
            tileImage: Tile1,
            fastestPlebianTime: 0,
            fastestEasyTime: 0,
            fastestMediumTime: 0,
            fastestHardTime: 0,
            fastestExpertTime: 0,
        }
        
    }

    componentDidMount() {
        database.ref('times/1').orderByValue().limitToFirst(1).once("value",(snapshot) => {
            snapshot.forEach((child)=>{this.setState({fastestPlebianTime: child.val()}) })  })
        database.ref('times/2').orderByValue().limitToFirst(1).once("value",(snapshot) => {
            snapshot.forEach((child)=>{this.setState({fastestEasyTime: child.val()}) })  })
        database.ref('times/3').orderByValue().limitToFirst(1).once("value",(snapshot) => {
            snapshot.forEach((child)=>{this.setState({fastestMediumTime: child.val()})  })  })
        database.ref('times/4').orderByValue().limitToFirst(1).once("value",(snapshot) => {
            snapshot.forEach((child)=>{this.setState({fastestHardTime: child.val()})})  })
        database.ref('times/5').orderByValue().limitToFirst(1).once("value",(snapshot) => {
            snapshot.forEach((child)=>{this.setState({fastestExpertTime: child.val()}) })  })
    }

    select(button) {
        switch(button) {
            case "baseball":
                this.setState({selectedBall: true, ballImage: Ball1, ballBarImage: BallBar1})
                break
            case "basketball":
                this.setState({selectedBall: true, ballImage: Ball2, ballBarImage: BallBar2})
                break
            case "beachball":
                this.setState({selectedBall: true, ballImage: Ball3, ballBarImage: BallBar3})
                break
            case "bowlingball":
                this.setState({selectedBall: true, ballImage: Ball4, ballBarImage: BallBar4})
                break
            case "poolball":
                this.setState({selectedBall: true, ballImage: Ball5, ballBarImage: BallBar5})
                break
            case "tennisball":
                this.setState({selectedBall: true, ballImage: Ball6, ballBarImage: BallBar6})
                break
            case "volleyball":
                this.setState({selectedBall: true, ballImage: Ball7, ballBarImage: BallBar7})
                break
            case "plebian":
                this.switchButtonColor("plebian","darkgreen")
                this.setState({
                    selectedDifficulty: true,
                    difficulty: 1,
                    background: PlebianBackground,
                    tileImage: Tile1})
                break
            case "easy":
                this.switchButtonColor("easy","darkblue")
                this.setState({
                    selectedDifficulty: true,
                    difficulty: 2,
                    background: EasyBackground,
                    tileImage: Tile2})
                break
            case "medium":
                this.switchButtonColor("medium","gold")
                this.setState({
                    selectedDifficulty: true,
                    difficulty: 3,
                    background: MediumBackground,
                    tileImage: Tile3})
                break
            case "hard":
                this.switchButtonColor("hard","darkred")
                this.setState({
                    selectedDifficulty: true,
                    difficulty: 4,
                    background: HardBackground,
                    tileImage: Tile4})
                break
            case "expert":
                this.switchButtonColor("expert","purple")
                this.setState({
                    selectedDifficulty: true,
                    difficulty: 5,
                    background: ExpertBackground,
                    tileImage: Tile5})
                break
            case "Ok":
                if (this.state.selectedDifficulty && this.state.selectedBall)
                    this.setState({ selectionsSet: true })
                break
            default:
            
        }
    }

    switchButtonColor(buttonID, color) {
        document.getElementById(buttonID).style.backgroundColor = color
        if (buttonID !== "plebian") {
            document.getElementById("plebian").style.backgroundColor = "transparent"
            document.getElementById("plebian").style.color = "black"
        }
        else    document.getElementById("plebian").style.color = "white"
        if (buttonID !== "easy") {
            document.getElementById("easy").style.backgroundColor = "transparent"
            document.getElementById("easy").style.color = "black"
        }
        else    document.getElementById("easy").style.color = "white"
        if (buttonID !== "medium")  document.getElementById("medium").style.backgroundColor = "transparent"
        if (buttonID !== "hard") {
            document.getElementById("hard").style.backgroundColor = "transparent"
            document.getElementById("hard").style.color = "black"
        }
        else    document.getElementById("hard").style.color = "white"
        if (buttonID !== "expert")    {
            document.getElementById("expert").style.backgroundColor = "transparent"
            document.getElementById("expert").style.color = "black"
        }
        else    document.getElementById("expert").style.color = "white"
    }

    render() {
        if (this.state.selectionsSet) {
            return (
                <BounceGame tileImage= {this.state.tileImage}
                    difficulty={this.state.difficulty}
                    background= {this.state.background}
                    ballImage= {this.state.ballImage}
                    ballBarImage= {this.state.ballBarImage}/>
            )
        }
        else {
            return (
            <div>
                <div id= "fill" style= {{left: this.state.xPos*-1}}>
                    <h1 className= "fade_in">Bounce!</h1>
                    <p className = "subtitle left text fade_in">(a game that involves bouncing)</p>
                    <p className = "instructions right text fade_in">Reach the goal before your ball runs out of energy</p>
                    <div className= "fade_in">
                        <button onClick= {() => this.select("baseball")} className = "bouncy ball" style= {{backgroundImage: 'url('+Ball1+')', width: 50}}/>
                        <button onClick= {() => this.select("basketball")} className = "bouncy ball" style= {{animationDelay: `0.07s`, backgroundImage: 'url('+Ball2+')', width: 50}}/>
                        <button onClick= {() => this.select("beachball")} className = "bouncy ball" style= {{animationDelay: `0.14s`, backgroundImage: 'url('+Ball3+')', width: 50}}/>
                        <button onClick= {() => this.select("bowlingball")} className = "bouncy ball" style= {{animationDelay: `0.21s`, backgroundImage: 'url('+Ball4+')', width: 50}}/>
                        <button onClick= {() => this.select("poolball")} className = "bouncy ball" style= {{animationDelay: `0.28s`, backgroundImage: 'url('+Ball5+')', width: 50}}/>
                        <button onClick= {() => this.select("tennisball")} className = "bouncy ball" style= {{animationDelay: `0.35s`, backgroundImage: 'url('+Ball6+')', width: 50}}/>
                        <button onClick= {() => this.select("volleyball")} className = "bouncy ball" style= {{animationDelay: `0.42s`, backgroundImage: 'url('+Ball7+')', width: 50}}/>
                    </div>
                    <div className= "fade_in">
                        <button id= "plebian" onClick= {() => this.select("plebian")} className = "button1 bouncy" style= {{border: 'solid green 1vmin', }}>Plebian<br/>{this.state.fastestPlebianTime}s</button>
                        <button id= "easy" onClick= {() => this.select("easy")} className = "button1 bouncy" style= {{animationDelay: `0.07s`,  border: `solid blue 1vmin`}}>Easy<br/>{this.state.fastestEasyTime}s</button>
                        <button id= "medium" onClick= {() => this.select("medium")} className = "button1 bouncy" style= {{animationDelay: `0.14s`,  border: `solid orange 1vmin`}}>Medium<br/>{this.state.fastestMediumTime}s</button>
                        <button id= "hard" onClick= {() => this.select("hard")} className = "button1 bouncy" style= {{animationDelay: `0.21s`,  border: `solid red 1vmin`}}>Hard<br/>{this.state.fastestHardTime}s</button>
                        <button id= "expert" onClick= {() => this.select("expert")} className = "button1 bouncy" style= {{animationDelay: `0.28s`,  border: `solid black 1vmin`}}>Expert<br/>{this.state.fastestExpertTime}s</button>
                    </div>
                    <button className = "fade_in text ok_button" onClick= {() => this.select("Ok")}>Ok?</button>
                </div>
                <div className= "login_logout">
                    <LoginLogout/>
                </div>
            </div>
            )
        }
    }
}

export default IntroPage