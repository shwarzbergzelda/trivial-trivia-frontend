import React, { useContext } from 'react'
import { Context } from './Context'
import { Link } from 'react-router-dom'
export default function QuizResults(props) {
    const { correctAnswersCount, numberOfQuizQuestions } = useContext(Context);

    return (
        <div>
            <h1>Quiz Results</h1>
            <h3>Total Points</h3>
            <h5>{correctAnswersCount}/{numberOfQuizQuestions}</h5>
            <button><Link to="/Category">Take Another Quiz</Link></button>
            <button><Link to="/Leaderboard">Leaderboard</Link></button>
        </div>
    )
}