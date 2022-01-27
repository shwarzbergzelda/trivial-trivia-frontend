import { createContext, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

export const Context = createContext({
    category: null,
    chooseCategory: (category) => {},
    quizJSON: null,
    fetchQuizJSON: () => {},
    correctAnswers: 0,
    isLogin: false,
    userName : "Guest",
    password : null,
    userInfo : {
        userName : "Guest",
        bestCategory : "Not Available",
        bestScore: "Not Available",
        lastSeen: "Not Available"
    },
    login : () => {},
    setSelectedCategoryNumber : null
});

export default function ContextKeeper(props) {
    const navigate = useNavigate();

    const [category, setCategory] = useState(null);
    const [quizJSON, setQuizJSON] = useState([]);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
    const [numberOfQuizQuestions, setNumberOfQuizQuestions] = useState(10)
    const [selectedCategoryNumber,setSelectedCategoryNumber] = useState(null)

    //login info
    const [isLogin, setIsLogin] = useState(false)
    const [userName,setUserName] = useState('Guest')
    const [password,setPassword] = useState(null)
    const [userInfo, setUserInfo] = useState({
        userName : "Guest",
        bestCategory : "Not Available",
        bestScore: "Not Available",
        lastSeen: "Not Available"
    })


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

    const setLoginToTrue = async () => {
        setIsLogin(true)

    }

    const reassignUserInfo = (info) =>{
        setUserInfo(info)
    }


    const reassignCategoryNumber = (number) =>{
        setSelectedCategoryNumber(number)
    }

    const reassignUserName = (userName) =>{
        setUserName(userName)
    }

    const login = async (enteredUserName, enteredPassword) => {
        const res = await axios.get(`https://trivial-trivia-backend.herokuapp.com/user/login/${enteredUserName}`);
        if(enteredPassword === res.data.password){
            setLoginToTrue()
            const res = await axios.get(`https://trivial-trivia-backend.herokuapp.com/user/${enteredUserName}`);
            console.log(res.data)
            reassignUserInfo(res.data)
        }
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
            numberOfQuizQuestions: numberOfQuizQuestions,
            isLogin: isLogin,
            userName: userName,
            password: password,
            userInfo: userInfo,
            setLoginToTrue: setLoginToTrue,
            reassignUserInfo: reassignUserInfo,
            login: login,
            selectedCategoryNumber : selectedCategoryNumber,
            reassignCategoryNumber : reassignCategoryNumber,
            reassignUserName : reassignUserName
        }}>
            {props.children}
        </Context.Provider>
    )
}

