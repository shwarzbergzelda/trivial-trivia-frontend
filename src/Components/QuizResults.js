import React, { useContext } from 'react'
import { Context } from './Context'
import { Link } from 'react-router-dom'
import '../styles/QuizResults.css'
import '../styles/Selection.css'

export default function QuizResults(props) {
    const { correctAnswersCount, numberOfQuizQuestions } = useContext(Context);

    return (
        <div className="quiz-results-main">
            <h1 className="quiz-results-header">Quiz Results</h1>
            <h3 className="total-points-header">Total Points</h3>
            <h5 className="results-text">{correctAnswersCount}/{numberOfQuizQuestions}</h5>
            <button className="link-button submit-button"><Link to="/Category">Take Another Quiz</Link></button>
            <button className="link-button submit-button"><Link to="/Leaderboard">Leaderboard</Link></button>
        </div>
    )
}