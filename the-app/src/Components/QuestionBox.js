import React from 'react'
import QuestionBoxImage from './Images/question_box.png'

function QuestionBox(props) {
    return(
        <img src= {QuestionBoxImage}
        style= {{position: "absolute",
            height: 50, 
            top: props.yPos,
            left: props.xPos}}/>
    )
}

export default QuestionBox