import React, { useContext, useState, useEffect, memo } from 'react'
import { Context } from './Context'
import { useNavigate } from 'react-router-dom'
import '../styles/Selection.css'

export default function Quiz() {

    const { incrementCorrectAnswersCount, resetCorrectAnswersCount } = useContext(Context);
    const { quizJSON } = useContext(Context);
    const [randomizedAnswersArray, setRandomizedAnswersArray] = useState([]);
    const [correctAnswerIndex, setCorrectAnswersIndex] = useState(-1);
    const [id, setID] = useState(0);
    const navigate = useNavigate();
    let selectedAnswerChoiceIndex = -1;
    let key = 0;
    console.log(quizJSON)

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
    },[])

    const handleTriviaProblemSubmit = () => {
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

    // let stringData = JSON.stringify(res.data.results)
    //     stringData = stringData.replaceAll("&#039;", "'")
    //     stringData = stringData.replaceAll("&quot;", '"')

    const handleTriviaAnswerSelect = (event) => {
        selectedAnswerChoiceIndex = event.target.value;
    }

    
    return(
        <div>
            <h1 className="header">{quizJSON[id].question.replaceAll("&#039;", "'").replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&oacute;", "ó")}</h1>
            {randomizedAnswersArray.map((answer, index) => {
                return (
                    <div className="buttons-grid" key={key++}>
                        <button className="button" value={index} onClick={handleTriviaAnswerSelect}>{answer.replaceAll("&#039;", "'").replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&oacute;", "ó")}</button>
                    </div>
                )
            })}
            <button className="submit-button" onClick={handleTriviaProblemSubmit}>Submit</button>
        </div>
    )
}
