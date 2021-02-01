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
                    selectedColor: true})
                break
            case "easy":
                this.setState({
                    selectionPlebianColor: "gray",
                    selectionEasyColor: "green",
                    selectionMediumColor: "gray",
                    selectionHardColor: "gray",
                    selectionExpertColor: "gray",
                    selectedColor: true})
                break
            case "medium":
                this.setState({
                    selectionPlebianColor: "gray",
                    selectionEasyColor: "gray",
                    selectionMediumColor: "blue",
                    selectionHardColor: "gray",
                    selectionExpertColor: "gray",
                    selectedColor: true})
                break
            case "hard":
                this.setState({
                    selectionPlebianColor: "gray",
                    selectionEasyColor: "gray",
                    selectionMediumColor: "gray",
                    selectionHardColor: "red",
                    selectionExpertColor: "gray",
                    selectedColor: true})
                break
            case "expert":
                this.setState({
                    selectionPlebianColor: "gray",
                    selectionEasyColor: "gray",
                    selectionMediumColor: "gray",
                    selectionHardColor: "gray",
                    selectionExpertColor: "purple",
                    selectedColor: true})
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
                <LineRiderGame
                    //define components
                />
            )
        }
        else {
            return (
            <div>
                <div id= "fill_screen" style= {{left: this.state.xPos*-1}}>
                    <h1 className= "text fade_in">Line Roller</h1>
                    <p className = "subtitle left text fade_in">(not to be confused with Line Rider)</p>
                    <p className = "instructions right text fade_in">Choose difficulty and bounce to the right with the arrow keys!</p>
                    <p className = "fade_in text_difficulty" style={{marginBottom: 0}}>Difficulty</p>
                    <div className= "fade_in in_line">
                        <button onClick= {() => this.select("plebian")} style= {{backgroundColor: this.state.selectionPlebianColor}}>Plebian</button>
                        <button onClick= {() => this.select("easy")} style= {{backgroundColor: this.state.selectionEasyColor}}>Easy</button>
                        <button onClick= {() => this.select("medium")} style= {{backgroundColor: this.state.selectionMediumColor}}>Medium</button>
                        <button onClick= {() => this.select("hard")} style= {{backgroundColor: this.state.selectionHardColor}}>Hard</button>
                        <button onClick= {() => this.select("expert")} style= {{backgroundColor: this.state.selectionExpertColor}}>Expert</button>
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