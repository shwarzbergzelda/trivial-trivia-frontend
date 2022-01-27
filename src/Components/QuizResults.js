import React, { useContext, useEffect } from 'react'
import { Context } from './Context'
import { Link } from 'react-router-dom'
import '../styles/QuizResults.css'
import '../styles/Selection.css'
import axios from 'axios'

export default function QuizResults(props) {
    const { correctAnswersCount, numberOfQuizQuestions, selectedCategoryNumber, userName } = useContext(Context);

    console.log(selectedCategoryNumber)

    const setCategoryText = () =>{
        let categoryText = ''
        switch(selectedCategoryNumber) {
            case '9': 
            categoryText = "General Knowledge"
            case '18':
            categoryText = "Science: Computer"
            case '23':
            categoryText = "History"
            case '20':
            categoryText = "Mythology"
            case '27':
            categoryText = "Animals"
            case '26':
            categoryText = "Celebrities"
        }
        console.log(selectedCategoryNumber)
        return categoryText
    }

    const sendQuizScore = async (quizRecord) => {
        console.log('SENDING THE QUIZ')
        const res = await axios.post(`https://trivial-trivia-backend.herokuapp.com/quizscore`, quizRecord)
        console.log(res)
    }



    useEffect(()=>{
        let today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const quizRecord = {
            category : setCategoryText(),
            score : correctAnswersCount,
            QuizDate : date,
            userUserName : userName
        }
        console.log(quizRecord)
        
        sendQuizScore(quizRecord)

    },[])

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