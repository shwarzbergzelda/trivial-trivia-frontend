import React, { useContext, useEffect } from 'react'
import { Context } from './Context'
import { Link } from 'react-router-dom'
import '../styles/QuizResults.css'
import '../styles/Selection.css'
import axios from 'axios'

export default function QuizResults(props) {
    const { correctAnswersCount, numberOfQuizQuestions, selectedCategoryNumber, userName, reassignUserInfo } = useContext(Context);

    const sendQuizScore = async (quizRecord) => {
        const res = await axios.post(`https://trivial-trivia-backend.herokuapp.com/quizscore`, quizRecord)
    }

    const updateBestCategoryAndScore = async (userName, categoryText, quizRecord) =>{
        const res = await axios.get(`https://trivial-trivia-backend.herokuapp.com/user/${userName}`);
        if(res.data.bestScore <= quizRecord.score){
            const newUserInfo = {
                userName : userName,
                bestCategory : categoryText,
                bestScore : quizRecord.score
            }
            console.log(newUserInfo)
            const res = await axios.put(`https://trivial-trivia-backend.herokuapp.com/user/updateUserInfo`, newUserInfo);
            console.log(res)
            reassignUserInfo(res.data.newData)
        }
    }



    useEffect(()=>{
        let categoryText = "No test taken yet"

        switch(selectedCategoryNumber) {
            case '9': 
            categoryText = "General Knowledge"
            break;
            case '18':
            categoryText = "Science: Computer"
            break;
            case '23':
            categoryText = "History"
            break;
            case '20':
            categoryText = "Mythology"
            break;
            case '27':
            categoryText = "Animals"
            break;
            case '26':
            categoryText = "Celebrities"
            break;
            default:
                break;
        }


        let today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const quizRecord = {
            category : categoryText,
            score : correctAnswersCount,
            QuizDate : date,
            userUserName : userName
        }
        
        sendQuizScore(quizRecord)

        updateBestCategoryAndScore(userName, categoryText, quizRecord)

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