import React, { useContext, useEffect, useState } from 'react';
import { Context } from './Context'
import { useNavigate } from "react-router-dom";

export default function Login(){
    let navigate = useNavigate();
    const { setLoginToTrue, reassignUserInfo, login, isLogin, reassignUserName  } = useContext(Context);

    const [enteredUserName,setEnteredUserName] = useState(null)
    const [enteredPassword,setEnteredPassword] = useState(null)
    const [accountCheck,setAccountCheck] = useState('')
    const [emptyCheck, setEmptyCheck] = useState('')

    const logInAndNavigate = async (enteredUserName,enteredPassword) => {
        setEmptyCheck('')
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
    
        setAccountCheck(await login(enteredUserName, enteredPassword))
    }

    useEffect(()=>{
        if(isLogin){
            reassignUserName(enteredUserName)
            navigate('/category')
        }
    }, [isLogin])

    return(
        <div className = "login">
        <h1>Sign In</h1>
        <label className='user'> User </label>
        <input
            type = "text"
            placeholder = "Please enter your username"
            onChange={(event)=> {
                setEnteredUserName(event.target.value)
            }} 
        />
        <input 
            type = "password"
            placeholder = "Please enter your password"
            onChange={(event) =>{
                setEnteredPassword(event.target.value)
            }}
        />
        <button className = "button"
            onClick = {() => logInAndNavigate(enteredUserName,enteredPassword)}
        >
        Login 
        </button>
        <button className = "button"
            onClick = {() => navigate('/Register')}
        >
        Register
        </button>
        {accountCheck === "Invalid username" && <h1>INVALID USER NAME</h1>}
        {accountCheck === "Incorrect password" && <h1>INCORRECT PASSWORD</h1>}
        {emptyCheck === "Please enter a password" && <h1>PLEASE ENTER A PASSWORD</h1>}
        {emptyCheck === "Please enter a username" && <h1>PLEASE ENTER A USERNAME</h1>}
        {emptyCheck === "Please enter a username and password" && <h1>PLEASE ENTER A USERNAME AND PASSWORD</h1>}
        </div>
    )
}