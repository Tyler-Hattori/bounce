import React from 'react'
import QuestionBoxImage from './Images/question_box.png'

function QuestionBox(props) {
    return(
        <img src= {QuestionBoxImage}
        style= {{position: "absolute",
            height: props.width, 
            top: props.yPos,
            left: props.xPos}}/>
    )
}

export default QuestionBox