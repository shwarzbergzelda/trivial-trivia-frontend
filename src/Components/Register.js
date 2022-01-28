import React, { useContext, useState,useEffect } from 'react';
import { Context } from './Context'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

export default function Register(){
    let navigate = useNavigate();

    const { isLogin,userName, password, userInfo, setLoginToTrue, reassignUserInfo,login, reassignUserName } = useContext(Context);

    const [enteredUserName,setEnteredUserName] = useState(null)
    const [enteredPassword,setEnteredPassword] = useState(null)
    const [emptyCheck, setEmptyCheck] = useState('')

    const logInAndNavigate = (enteredUserName,enteredPassword) => {
        login(enteredUserName,enteredPassword)
    }

    useEffect(() => {
        document.title = "Register - Trivial Trivia"
    }, [])

    useEffect(()=>{
        if(isLogin){
            reassignUserName(enteredUserName)
            navigate('/')
        }
    }, [isLogin])

    const RegisterAndNavigate = async (enteredUserName, enteredPassword) => {
        if((enteredUserName === null || enteredUserName === '') && (enteredPassword === null || enteredPassword === '')){
            setEmptyCheck("Please enter a username and password")
            return;
        }
        if(enteredUserName === null || enteredUserName === ''){
            setEmptyCheck("Please enter a username")
            return;
        }
        if(enteredPassword === null || enteredPassword === ''){
            setEmptyCheck("Please enter a password")
            return;
        }

        let today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const newUser = {
            userName : enteredUserName,
            password : enteredPassword,
            lastSeen : date
        }


        const res = await axios.post(`https://trivial-trivia-backend.herokuapp.com/user/signup`, newUser);
        if(res.data === "Validation error"){
            setEmptyCheck("Username already exists")
        }

        logInAndNavigate(enteredUserName, enteredPassword)
    }




    return(
        
        <div className = "Register">
        <h1 className="register-header">Create Account</h1>
        <div>
        <label className='user'> Username </label>
        <input
            type = "text"
            placeholder = "Please enter a username"
            className="user-input-box"
            onChange={(event)=> {
                setEnteredUserName(event.target.value)
            }} 
        />
        </div>
        <div>
        <label className='user'> Password </label>
        <input 
            type = "password"
            placeholder = "Please enter a password"
            className="password-input-box"
            onChange={(event) =>{
                setEnteredPassword(event.target.value)
            }}
        />
        <div>
        <button className = "register-button"
            onClick = {() => RegisterAndNavigate(enteredUserName,enteredPassword)}
        >
        Register
        </button>
        </div>
        </div>
        {emptyCheck === "Please enter a password" && <h1 className="error-message">Please enter a password</h1>}
        {emptyCheck === "Please enter a username" && <h1 className="error-message">Please enter a username</h1>}
        {emptyCheck === "Please enter a username and password" && <h1 className="error-message">Please enter a username and password</h1>}
        {emptyCheck === "Username already exists" && <h1 className="error-message">Username already exists. Please choose another one.</h1>}
        </div>
    )
}