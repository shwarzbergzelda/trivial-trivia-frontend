import React from 'react';
import { useLoginContext} from './Contexts/LoginContext'

export default function Login(){
    const { dispatch, context: { username, displayUserProfile } } = useLoginContext();

    return(
        <div className = "login">
        <label className='user'> User </label>
        <input
            type = "text"
            placeholder = "Please enter your username"
            onChange={(event)=> {
                dispatch({ type: setUsername, payload: event.target.value });
            }} 
        />
        <input 
            type = "password"
            placeholder = "Please enter your password"
        />
        <button
            onClick = {() => {
                dispatch({type: setDisplayUserProfile});
            }}
        >
        Login 
        </button>
        </div>

    )
}