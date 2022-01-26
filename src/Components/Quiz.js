import React, { useContext, useState, useEffect, memo } from 'react'
import { Context } from './Context'
import { useNavigate } from 'react-router-dom'

export default function Quiz() {

    const { incrementCorrectAnswersCount, resetCorrectAnswersCount } = useContext(Context);
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

        return answersArray;
    }

    useEffect(() => {
        resetCorrectAnswersCount();
        setRandomizedAnswersArray(randomizeAnswersOrder(quizJSON[id]));
    },[])

    const handleTriviaProblemSubmit = () => {
        if (selectedAnswerChoiceIndex == -1) {
            alert('Please select an answer choice!');
            return;
        }
        if(correctAnswerIndex == selectedAnswerChoiceIndex) {
            incrementCorrectAnswersCount();
        }
        key = 0;
        selectedAnswerChoiceIndex = -1;
        if (id < 9) {
            setID(prevID => prevID + 1);
            setRandomizedAnswersArray(randomizeAnswersOrder(quizJSON[id]));
        } else {
            navigate('/Quiz-Results')
        }
    }

    const handleTriviaAnswerSelect = (event) => {
        selectedAnswerChoiceIndex = event.target.value;
    }

    return(
        <div>
            <h1>{quizJSON[id].question}</h1>
            {randomizedAnswersArray.map((answer, index) => {
                return (
                    <div key={key++}>
                        <button value={index} onClick={handleTriviaAnswerSelect}>{answer}</button>
                    </div>
                )
            })}
            <button onClick={handleTriviaProblemSubmit}>Submit</button>
        </div>
    )
};
    // const isMounted = useRef(false);


    // useEffect(() => {
    //     if (isMounted.current) {
    //         handleTriviaProblemSubmit();
    //     } else {
    //       isMounted.current = true;
    //     }
    //   }, [questionWasSubmitted]);
