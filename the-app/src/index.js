import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LineRiderGame from './LineRiderGame.js'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <h1>Line Roller</h1>
    <div className = "text">
      <p className = "subtitle"> (not to be confused with Line Rider) </p>
      <p className = "instructions"> Draw a line for the ball to roll into the goal </p>
    </div>
    <LineRiderGame/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
