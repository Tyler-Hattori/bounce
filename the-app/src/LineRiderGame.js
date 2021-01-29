import './LineRiderGame.css'
import './index.css' //I moved the intro page messages to this one so that they will move away with the background
import React from 'react'
import GameOver from './GameOver.js'
import LoginLogout from './LoginLogout.js'

class LineRiderGame extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleKeyDown = this.handleKeyDown.bind(this)

        //Quick JAVA/REACT variable usage tutorial:

        //I use the terms method and function interchangably. Also, the term object just means something we created that follows the rules of a certain class.
        //IN JAVA, you typically initialize a variable in the constructor, and create two methods (normally called "setVariable()" and "getVariable()" )...
        //that can be used to change or access the variable's value at a later time. However, the variables in a CLASS's constructor can be used...
        //inside ANY method in that CLASS as long as you say this.variable_name ("this." points to the CLASS--LineRiderGame in this case)...
        //If you were to not use "this." , the code would try to find a variable called variable_name inside that METHOD. This is why "this." is...
        //so important. 
        //The reason we like setVariable() and getVariable() methods in Java is because what if we want to know the value of a variable from...
        //an object of a DIFFERENT class? "this." wouldn't work, because it wouldn't point to the right class. Well, with a getVariable() method...
        //we could say "object_name.getVariable()" and it would work fine. 

        //HOWEVER, REACT IS A LITTLE DIFFERENT
        //In React, in a class constructor, initialize variables inside "this.state" as shown below. Then, if we want to change the value of a variable,...
        //to 2 just call this.setState = { variable: 2 }. If you read this code, you'll see how to use setState() to easily change multiple values at once.
        //The downside is instead of using "this.variable" you have to use "this.state.variable"

        this.state = {
            yPos: 150,
            xPos: 220,
            ballDirection: '',
            timeoutId: 0,
            gameLoopTimeout: 50,
            ballSpeedY: 0,
            ballSpeedX: 0,
            gravity: 2,
            xAcceleration: 0.6,
            ballSize: 40,
            keyPressed: false,
            bounced: false,
            isGameover: false,
            selectionsSet: false,
            selectionEasyColor: 'gray',
            selectionMediumColor: 'gray',
            selectionPlebianColor: 'gray',
            selectionHardColor: 'gray',
            selectionExpertColor: 'gray',
            selectedColor: false,
            loggedIn: false,
            setName: '',
        }
    }

    //You can normally name methods whatever you want, but some names have been preset to do certain things
    //This is specially-named method in REACT that will run immediately after LineRiderGame is created
    componentDidMount() {
        this.startGame()
        window.addEventListener('keydown', this.handleKeyDown)
        this.gameLoop()
    }

    startGame() {
        //Game
        //Ball 
        this.setState ({
        })
    }

    gameLoop() { 
        //by calling gameLoop() inside this method, it creates a loop... 
        //so we can constantly be updating object positions on the page...
        //or check if the user is pressing a key

        let timeoutId = setTimeout(() => { //timeouts will run everything in the first parameter after a certain amount of time (second parameter-gameLoopTimeout)
            if (!this.state.selectionsSet) {
                //if the user has not selected the difficulty and such
              this.makeSelections()
            }
            else if (!this.state.isGameOver) {
                //the user did selecte the difficulty, and the game is not over. This is the gameplay
              this.fall()  //implements gravity
              this.changeDirection()
              this.setState({ keyPressed: false, ballDirection: 'zero acceleration' })
            }
      
            this.gameLoop()
          }, this.state.gameLoopTimeout)
      
        this.setState({ timeoutId })
    }

    //This is also a specially-named method
    componentWillUnmount() {
        clearTimeout(this.state.timeoutId)
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    makeSelections() {
        let difficultyStatus = this.state.selectionsSet
        if (difficultyStatus) {
            this.setState({ selectionsSet: true })
        }
    }

    //gravity. document.getElementByID() is an extremely useful tool to access the properties of an HTML element.
    //Check out the render() method to see what I'm talking about.
    fall() {
        let grav = this.state.gravity
        let ball_speed = this.state.ballSpeedY
        let y = this.state.yPos + ball_speed
        let game_height = document.getElementById("fill_screen").clientHeight - this.state.ballSize - 10
        if (this.state.yPos >= game_height && !this.state.bounced) {
            ball_speed *= -1
            this.setState({bounced: true})
        }
        if (this.state.yPos < game_height && this.state.bounced) {
            this.setState({bounced: false})
        }
        this.setState({
            ballSpeedY: ball_speed + grav,
            yPos: y})
    }

    //since it was called in gameLoop(), it will constantly be checking what the ballDirection is (left or right)
    //switch and case is just a fancy way to get around using if and else if statements.
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

    //essentially gravity in the sideways direction
    moveSideways(dir) {
        let acceleration = this.state.xAcceleration
        let ball_speed = this.state.ballSpeedX
        if (dir === 'left')
            acceleration = acceleration * -1
        if (dir === 'zero acceleration')
            acceleration = 0;
        let x = this.state.xPos + ball_speed
        this.setState({
            ballSpeedX: ball_speed + acceleration,
            xPos: x
        })
    }

    resetGame() {
        //reset the Game
        //reset the Ball position

        this.setState({
            
        })
    }

    //Checks when the arrow keys are pressed. 37 keycode is the left arrow key, for example.
    //I can do this without using gameLoop() because I set up handleKeyDown as an EVENT LISTENER in the constructor.
    //Google can explain event listeners in React.js better than I can.
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

    //specially-named method that runs whenever we update props or components
    //This is HTML. It is how we get the JAVA code we write to actually show up on screen.
    //REACT is cool because it combines JAVA and HTML in this way. Normally, you write a website code in HTML...
    //and if you want Java you have to use the <script> (JavaScript code) </script> tag
    render() {
        // If the user wins
        if (this.state.isGameOver) {
            return (
                <GameOver
                    //define components
                />
            )
        }

        if (this.state.selectionsSet) { 
            return(
            <div>
                <div id = "fill_screen"
                    style= {{left: this.state.xPos*-1}}>
                        <h1 className= "text fade_in" style={{color:this.state.selectionColor}}>Line Roller</h1>
                        <p className = "subtitle left text fade_in"> (not to be confused with Line Rider) </p>
                        <p className = "instructions right text fade_in"> Game instructions </p>
                </div>
                        
                <div>
                    <img src= "https://clipart.info/images/ccovers/1495749720Bowling-Ball-PNG-Clip-Art.png"
                        style= {{height: this.state.ballSize, 
                            top: this.state.yPos}} 
                        id= "ball-image"
                        className = 'Ball'
                        alt = "ball"/>
                </div>
            </div>
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
export default LineRiderGame;