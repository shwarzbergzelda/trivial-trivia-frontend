import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Context = createContext({
    category: null,
    chooseCategory: (category) => {},
    quizJSON: null,
    fetchQuizJSON: () => {},
    correctAnswers: 0
});

export default function ContextKeeper(props) {
    const [category, setCategory] = useState(null);
    const [quizJSON, setQuizJSON] = useState([]);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
    const [numberOfQuizQuestions, setNumberOfQuizQuestions] = useState(10)

    const chooseCategory = (categoryNumber) => {
        setCategory(categoryNumber);
    }

    const fetchQuizJSON = async () => {
        const res = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`);
        setQuizJSON(res.data.results)
    }

    const incrementCorrectAnswersCount = () => {
        setCorrectAnswersCount(prevCorrectAnswersCount => prevCorrectAnswersCount + 1);
    }

    const resetCorrectAnswersCount = () => {
        setCorrectAnswersCount(0);
    }
        
    return (
        <Context.Provider value={{
            category: category, 
            chooseCategory: chooseCategory, 
            quizJSON: quizJSON, 
            fetchQuizJSON: fetchQuizJSON, 
            incrementCorrectAnswersCount: incrementCorrectAnswersCount, 
            resetCorrectAnswersCount: resetCorrectAnswersCount,
            correctAnswersCount: correctAnswersCount,
            numberOfQuizQuestions: numberOfQuizQuestions
        }}>
            {props.children}
        </Context.Provider>
    )
}

