import React, { useContext, useState } from 'react';
import { Context } from './Context'
import axios from 'axios'
import { useNavigate } from "react-router-dom";




export default function Register(){
    let navigate = useNavigate();

    const { isLogin,userName, password, userInfo, setLoginToTrue, reassignUserInfo,login  } = useContext(Context);

    const [enteredUserName,setEnteredUserName] = useState(null)
    const [enteredPassword,setEnteredPassword] = useState(null)

    const logInAndNavigate = (enteredUserName,enteredPassword) => {
        login(enteredUserName,enteredPassword)
        navigate('/')
    }

    const RegisterAndNavigate = async (enteredUserName, enteredPassword) => {
        console.log("Registering")

        let today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const newUser = {
            userName : enteredUserName,
            password : enteredPassword,
            lastSeen : date
        }

        console.log(enteredUserName)

        const res = await axios.post(`https://trivial-trivia-backend.herokuapp.com/user/signup`, newUser);
        console.log(res)

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
        </div>
    )
}