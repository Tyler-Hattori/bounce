import React from 'react'
import LineRiderGame from './LineRiderGame.js'
import LoginLogout from '../LoginLogout.js'
import './IntroPage.css'
import PlebianBackground from '../Backgrounds/orange.jpg'
import EasyBackground from '../Backgrounds/forest_resized.jpg'
import MediumBackground from '../Backgrounds/sunset.jpg'
import HardBackground from '../Backgrounds/desert.jpg'
import ExpertBackground from '../Backgrounds/space.jpg'

class IntroPage extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            selectionsSet: false,
            selectionEasyColor: 'gray',
            selectionMediumColor: 'gray',
            selectionPlebianColor: 'gray',
            selectionHardColor: 'gray',
            selectionExpertColor: 'gray',
            selectedColor: false,
            background: PlebianBackground,
            difficulty: 0,
            gameLoopTimeout: 50,
            timeoutId: 0,
        }
    }

    componentDidMount() {
        this.gameLoop()
    }

    gameLoop() { 
        let timeoutId = setTimeout(() => {
            if (!this.state.selectionsSet) {
              this.makeSelections()
            }
            this.gameLoop()
          }, this.state.gameLoopTimeout)
      
        this.setState({ timeoutId })
    }

    componentWillUnmount() {
        clearTimeout(this.state.timeoutId)
    }

    makeSelections() {
        let status = this.state.selectionsSet
        if (status) {
            this.setState({ selectionsSet: true })
        }
    }

    select(difficulty) {
        switch(difficulty) {
            case "plebian":
                this.switchButtonColor("plebian","green")
                this.setState({
                    selectedColor: true,
                    difficulty: 1,
                    background: PlebianBackground})
                break
            case "easy":
                this.switchButtonColor("easy","blue")
                this.setState({
                    selectedColor: true,
                    difficulty: 2,
                    background: EasyBackground})
                break
            case "medium":
                this.switchButtonColor("medium","gold")
                this.setState({
                    selectedColor: true,
                    difficulty: 3,
                    background: MediumBackground})
                break
            case "hard":
                this.switchButtonColor("hard","red")
                this.setState({
                    selectedColor: true,
                    difficulty: 4,
                    background: HardBackground})
                break
            case "expert":
                this.switchButtonColor("expert","black")
                this.setState({
                    selectedColor: true,
                    difficulty: 5,
                    background: ExpertBackground})
                break
            case "Ok":
                if (this.state.selectedColor)
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
                <LineRiderGame difficulty={this.state.difficulty} background= {this.state.background}/>
            )
        }
        else {
            return (
            <div>
                <div id= "fill" style= {{left: this.state.xPos*-1}}>
                    <h1 className= "fade_in">Line Roller</h1>
                    <p className = "subtitle left text fade_in">(not to be confused with Line Rider)</p>
                    <p className = "instructions right text fade_in">Choose a difficulty and reach the goal before your ball loses its bounce!</p>
                    <div className= "fade_in">
                        <button id= "plebian" onClick= {() => this.select("plebian")} className = "button1 bouncy" style= {{border: 'solid green 1vmin', }}>Plebian</button>
                        <button id= "easy" onClick= {() => this.select("easy")} className = "button1 bouncy" style= {{animationDelay: `0.07s`,  border: `solid blue 1vmin`}}>Easy</button>
                        <button id= "medium" onClick= {() => this.select("medium")} className = "button1 bouncy" style= {{animationDelay: `0.14s`,  border: `solid gold 1vmin`}}>Medium</button>
                        <button id= "hard" onClick= {() => this.select("hard")} className = "button1 bouncy" style= {{animationDelay: `0.21s`,  border: `solid red 1vmin`}}>Hard</button>
                        <button id= "expert" onClick= {() => this.select("expert")} className = "button1 bouncy" style= {{animationDelay: `0.28s`,  border: `solid black 1vmin`}}>Expert</button>
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