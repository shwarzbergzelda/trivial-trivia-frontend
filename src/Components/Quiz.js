import React, { useContext, useState, useEffect } from 'react'
import { Context } from './Context'
import QuizQuestion from './QuizQuestion'

export default function Quiz() {

    const { quizJSON, incrementCorrectAnswersCount, resetCorrectAnswersCount, correctAnswersCount } = useContext(Context);
    const [questionWasSubmitted, setQuestionWasSubmitted] = useState(false);

    // change to state (but I be LAZY ><)

    const toggleQuestionWasSubmitted = () => {
        setQuestionWasSubmitted(prevQuestionWasSubmitted => !prevQuestionWasSubmitted);
    }

    useEffect(() => {
        incrementCorrectAnswersCount();
        return (
           <QuizQuestion questionWasSubmitted={questionWasSubmitted} toggleQuestionWasSubmitted={toggleQuestionWasSubmitted}/>
        )
    },[questionWasSubmitted])

    useEffect(() => {
        resetCorrectAnswersCount();
        incrementCorrectAnswersCount();
        console.log('life is like a rollercoaster. scary shit');
    },[])

    // renders the very first quiz question
    return (
        <QuizQuestion toggleQuestionWasSubmitted={toggleQuestionWasSubmitted}/>
    )
}