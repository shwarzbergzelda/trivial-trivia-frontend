import React, { useContext } from 'react'
import { Context } from './Context'

export default function QuizResults(props) {
    const { correctAnswersCount } = useContext(Context)
    return (
        <div>
            {correctAnswersCount}
        </div>
    )
}