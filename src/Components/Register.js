import React, { useContext, useState,useEffect } from 'react';
import { Context } from './Context'
import axios from 'axios'
import { useNavigate } from "react-router-dom";




export default function Register(){
    let navigate = useNavigate();

    const { isLogin,userName, password, userInfo, setLoginToTrue, reassignUserInfo,login, reassignUserName } = useContext(Context);

    const [enteredUserName,setEnteredUserName] = useState(null)
    const [enteredPassword,setEnteredPassword] = useState(null)
    const [emptyCheck, setEmptyCheck] = useState('')

    const logInAndNavigate = (enteredUserName,enteredPassword) => {
        login(enteredUserName,enteredPassword)
    }

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
        <h1>Create Account</h1>
        <label className='user'> User </label>
        <input
            type = "text"
            placeholder = "Please enter a username"
            onChange={(event)=> {
                setEnteredUserName(event.target.value)
            }} 
        />
        <input 
            type = "password"
            placeholder = "Please enter a password"
            onChange={(event) =>{
                setEnteredPassword(event.target.value)
            }}
        />
        <button className = "button"
            onClick = {() => RegisterAndNavigate(enteredUserName,enteredPassword)}
        >
        Register
        </button>
        {emptyCheck === "Please enter a password" && <h1>PLEASE ENTER A PASSWORD</h1>}
        {emptyCheck === "Please enter a username" && <h1>PLEASE ENTER A USERNAME</h1>}
        {emptyCheck === "Please enter a username and password" && <h1>PLEASE ENTER A USERNAME AND PASSWORD</h1>}
        {emptyCheck === "Username already exists" && <h1>USERNAME ALREADY EXIST</h1>}
        </div>
    )
}