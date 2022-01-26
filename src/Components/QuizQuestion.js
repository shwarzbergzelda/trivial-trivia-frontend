import React, { useState, useContext } from 'react'
import { Context } from './Context'
import { useNavigate } from 'react-router-dom'

export default function QuizQuestion(props) {
    const { quizJSON } = useContext(Context);
    let i = 0;
    const navigate = useNavigate();
    const [id, setID] = useState(0);

    const randomizeAnswersOrder = (triviaProblem) => {
        const answersArray = [];
        const usedIndices = [-1];

        let randomIndex = Math.floor(Math.random() * 4);
        answersArray[randomIndex] = triviaProblem.correct_answer;
        usedIndices.push(randomIndex);

        for (let i = 0; i < 3; i++) {
            randomIndex = -1;
            while(usedIndices.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random() * 4);
            }
            answersArray[randomIndex] = triviaProblem.incorrect_answers[i];
            usedIndices.push(randomIndex);
        }

        return answersArray;
    }

    const handleTriviaProblemSubmit = () => {
        if (id < 9) {
            props.toggleQuestionWasSubmitted(); // toggle submit to rerender useEffect below
            setID(prevID => prevID + 1);
        } else {
            navigate('/Quiz-Results')
        }
    }

    return(
        <div>
            <h1>{quizJSON[id].question}</h1>
            {randomizeAnswersOrder(quizJSON[id]).map((answer) => {
                return (
                    <div key={i++}>
                        <button>{answer}</button>
                    </div>
                )
            })}
            <button onClick={handleTriviaProblemSubmit}>Submit</button>
    </div>
    )
}