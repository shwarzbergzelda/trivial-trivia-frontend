import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import {Context} from './Context'

export default function Home(){

    let navigate = useNavigate();

    useEffect(() => {
        document.title = "Trivial Trivia"
    }, [])

    return (
        <div className="home-text">
            <h1 className="start-header"><Link to='/SignOrGuest'>Start</Link></h1>
            <h5 className="description-header">Battle of the Trivias</h5>
        </div>
    )
}