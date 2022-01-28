import { createContext, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useCookies } from 'react-cookie';

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
    setSelectedCategoryNumber : null,
    answersTracker: [],
    trackAnswers: () => {},
    resetAnswersTracker: () => {}
});

export default function ContextKeeper(props) {
    const navigate = useNavigate();

    const [category, setCategory] = useState(null);
    const [quizJSON, setQuizJSON] = useState([]);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
    const [numberOfQuizQuestions, setNumberOfQuizQuestions] = useState(10)
    const [selectedCategoryNumber,setSelectedCategoryNumber] = useState(null)
    const [answersTracker, setAnswersTracker] = useState([]);

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

    const [cookies, setCookie] = useCookies(['user'])

    const chooseCategory = (categoryNumber) => {
        setCategory(categoryNumber);
    }

    const fetchQuizJSON = async () => {
        const res = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&d&type=multiple`);
        console.log(res.data.results)
        // let stringData = JSON.stringify(res.data.results)
        // stringData = stringData.replaceAll("&#039;", "'")
        // stringData = stringData.replaceAll("&quot;", '"')
        // console.log(stringData)
        // const newRes = JSON.parse(stringData)
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
        if(res.data === "" && enteredUserName !== null ){
            return "Invalid username"
        }else if (res.data.password !== enteredPassword && enteredPassword !== null){
            return "Incorrect password"
        }
        if(enteredPassword === res.data.password){
            setLoginToTrue()
            const res = await axios.get(`https://trivial-trivia-backend.herokuapp.com/user/${enteredUserName}`);
            reassignUserInfo(res.data)
            const userInfoString = JSON.stringify(res.data);
            console.log(res.data)
            console.log(userInfoString)
            setCookie('UserInfo', res.data, { path: '/' });
        }
    }

    const setCookies = async () => {
        console.log(cookies.isLogin)
        if(isLogin && cookies.isLogin === undefined){
            console.log('Setting Cookies')
            setCookie('Username', userName, { path: '/' });
            setCookie('isLogin', isLogin, { path: '/' });
        }
    }

    setCookies()

    const reassignWithCookies = () => {
        if(cookies.isLogin){
            console.log('Reassigning with cookie info')
            setIsLogin(cookies.isLogin)
            setUserName(cookies.Username)
            setUserInfo(cookies.UserInfo)
        }
    }

    const trackAnswers = (answer) => {
        setAnswersTracker(prevAnswersArray => [...prevAnswersArray, answer]);
    }

    const resetAnswersTracker = () => {
        setAnswersTracker([]);
    }

    useEffect(()=>{
        reassignWithCookies()
    }, [])

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
            reassignUserName : reassignUserName,
            answersTracker: answersTracker,
            trackAnswers, trackAnswers,
            resetAnswersTracker: resetAnswersTracker
        }}>
            {props.children}
        </Context.Provider>
    )
}

