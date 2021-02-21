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
                this.setState({
                    selectedColor: true,
                    difficulty: 1,
                    background: PlebianBackground})
                break
            case "easy":
                this.setState({
                    selectedColor: true,
                    difficulty: 2,
                    background: EasyBackground})
                break
            case "medium":
                this.setState({
                    selectedColor: true,
                    difficulty: 3,
                    background: MediumBackground})
                break
            case "hard":
                this.setState({
                    selectedColor: true,
                    difficulty: 4,
                    background: HardBackground})
                break
            case "expert":
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
                    <p className = "instructions right text fade_in">Choose difficulty and bounce to the right with the arrow keys!</p>
                    <div className= "fade_in">
                        <button onClick= {() => this.select("plebian")} className = "button1 bouncy" style= {{border: 'solid lightgreen 1vmin', }}>Plebian</button>
                        <button onClick= {() => this.select("easy")} className = "button1 bouncy" style= {{animationDelay: `0.07s`,  border: `solid lightblue 1vmin`}}>Easy</button>
                        <button onClick= {() => this.select("medium")} className = "button1 bouncy" style= {{animationDelay: `0.14s`,  border: `solid yellow 1vmin`}}>Medium</button>
                        <button onClick= {() => this.select("hard")} className = "button1 bouncy" style= {{animationDelay: `0.21s`,  border: `solid red 1vmin`}}>Hard</button>
                        <button onClick= {() => this.select("expert")} className = "button1 bouncy" style= {{animationDelay: `0.28s`,  border: `solid black 1vmin`}}>Expert</button>
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