import React, { useContext, useState, useEffect, memo } from 'react'
import { Context } from './Context'
import { useNavigate } from 'react-router-dom'
import '../styles/Quiz.css'

export default function Quiz() {

    const { incrementCorrectAnswersCount, resetCorrectAnswersCount, trackAnswers, answersTracker, resetAnswersTracker} = useContext(Context);
    const { quizJSON } = useContext(Context);
    const [randomizedAnswersArray, setRandomizedAnswersArray] = useState([]);
    const [correctAnswerIndex, setCorrectAnswersIndex] = useState(-1);
    const [id, setID] = useState(0);
    const navigate = useNavigate();
    let selectedAnswerChoiceIndex = -1;
    let key = 0;

    const randomizeAnswersOrder = (triviaProblem) => {
        const answersArray = [];
        const usedIndices = [];

        let randomIndex = Math.floor(Math.random() * 4);
        answersArray[randomIndex] = triviaProblem.correct_answer;
        setCorrectAnswersIndex(randomIndex)
        usedIndices.push(randomIndex);

        for (let i = 0; i < 3; i++) {
            randomIndex = Math.floor(Math.random() * 4);
            while(usedIndices.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random() * 4);
            }
            answersArray[randomIndex] = triviaProblem.incorrect_answers[i];
            usedIndices.push(randomIndex);
        }

        console.log(answersArray);
        return answersArray;
    }

    useEffect(() => {
        document.title = "Quiz - Trivial Trivia"
        resetCorrectAnswersCount();
        setRandomizedAnswersArray(randomizeAnswersOrder(quizJSON[id]));
        resetAnswersTracker();
    },[])

    const handleTriviaProblemSubmit = () => {
        trackAnswers(randomizedAnswersArray[selectedAnswerChoiceIndex]);
        if (selectedAnswerChoiceIndex == -1) {
            alert('Please select an answer choice!');
            return;
        }
        if (correctAnswerIndex == selectedAnswerChoiceIndex) {
            incrementCorrectAnswersCount();
        }
        key = 0;
        selectedAnswerChoiceIndex = -1;
        if (id < 9) {
            setID(prevID => prevID + 1);
            setRandomizedAnswersArray(randomizeAnswersOrder(quizJSON[id + 1]));
        } else {
            navigate('/Quiz-Results')
        }
    }

    const handleTriviaAnswerSelect = (event) => {
        selectedAnswerChoiceIndex = event.target.value;
    }

    
    console.log(answersTracker);

    return(
        <div>
            <h1 className="header">{quizJSON[id].question.replaceAll("&#039;", "'").replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&oacute;", "ó").replaceAll("&amp;", "&").replaceAll("&aring;", "ö").replaceAll("&auml;", "ä").replaceAll("&ouml;", "ö").replaceAll("&rsquo;", "’").replaceAll("&iacute;", "í").replaceAll("&aacute;", "á").replaceAll("&Uuml;", "Ü")}</h1>
            <div  className="buttons-grid">
                {randomizedAnswersArray.map((answer, index) => {
                    return (
                        <div key={key++}>
                            <button className="quiz-answer-button" value={index} onClick={handleTriviaAnswerSelect}>{answer.replaceAll("&#039;", "'").replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&oacute;", "ó").replaceAll("&amp;", "&").replaceAll("&aring;", "ö").replaceAll("&auml;", "ä").replaceAll("&ouml;", "ö").replaceAll("&rsquo;", "’").replaceAll("&iacute;", "í").replaceAll("&aacute;", "á").replaceAll("&Uuml;", "Ü")}</button>
                        </div>
                    )
                })}
            </div>
            <button className="submit-button" onClick={handleTriviaProblemSubmit}>Submit</button>
        </div>
    )
}
