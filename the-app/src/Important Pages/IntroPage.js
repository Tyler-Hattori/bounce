import React from 'react'
import LineRiderGame from './LineRiderGame.js'
import LoginLogout from '../LoginLogout.js'
import './IntroPage.css'

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
                    selectionPlebianColor: "yellow",
                    selectionEasyColor: "gray",
                    selectionMediumColor: "gray",
                    selectionHardColor: "gray",
                    selectionExpertColor: "gray",
                    selectedColor: true,
                    difficulty: 1})
                break
            case "easy":
                this.setState({
                    selectionPlebianColor: "gray",
                    selectionEasyColor: "green",
                    selectionMediumColor: "gray",
                    selectionHardColor: "gray",
                    selectionExpertColor: "gray",
                    selectedColor: true,
                    difficulty: 2})
                break
            case "medium":
                this.setState({
                    selectionPlebianColor: "gray",
                    selectionEasyColor: "gray",
                    selectionMediumColor: "blue",
                    selectionHardColor: "gray",
                    selectionExpertColor: "gray",
                    selectedColor: true,
                    difficulty: 3})
                break
            case "hard":
                this.setState({
                    selectionPlebianColor: "gray",
                    selectionEasyColor: "gray",
                    selectionMediumColor: "gray",
                    selectionHardColor: "red",
                    selectionExpertColor: "gray",
                    selectedColor: true,
                    difficulty: 4})
                break
            case "expert":
                this.setState({
                    selectionPlebianColor: "gray",
                    selectionEasyColor: "gray",
                    selectionMediumColor: "gray",
                    selectionHardColor: "gray",
                    selectionExpertColor: "purple",
                    selectedColor: true,
                    difficulty: 5})
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
                <LineRiderGame difficulty={this.state.difficulty}/>
            )
        }
        else {
            return (
            <div>
                <div id= "fill" style= {{left: this.state.xPos*-1}}>
                    <h1 className= "text fade_in">Line Roller</h1>
                    <p className = "subtitle left text fade_in">(not to be confused with Line Rider)</p>
                    <p className = "instructions right text fade_in">Choose difficulty and bounce to the right with the arrow keys!</p>
                    <p className = "fade_in text_difficulty" style={{marginBottom: 0}}>Difficulty</p>
                    <div className= "section fade_in">
                        <button onClick= {() => this.select("plebian")} className = "button1 bouncy" style= {{ border: `solid lightgreen`}}>Plebian</button>
                        <button onClick= {() => this.select("easy")} className = "button1 bouncy" style= {{animationDelay: `0.07s`,  border: `solid lightblue`}}>Easy</button>
                        <button onClick= {() => this.select("medium")} className = "button1 bouncy" style= {{animationDelay: `0.14s`,  border: `solid yellow`}}>Medium</button>
                        <button onClick= {() => this.select("hard")} className = "button1 bouncy" style= {{animationDelay: `0.21s`,  border: `solid red`}}>Hard</button>
                        <button onClick= {() => this.select("expert")} className = "button1 bouncy" style= {{animationDelay: `0.28s`,  border: `solid black`}}>Expert</button>
                    </div>
                    <button className = "fade_in ok_button" onClick= {() => this.select("Ok")}>Ok?</button>
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