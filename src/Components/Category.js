import React, { useContext, useEffect, useState } from 'react';
import { Context } from './Context'
import { useNavigate } from 'react-router-dom'
import '../styles/Selection.css'
import axios from 'axios';

export default function Category(){
    const navigate = useNavigate();

    const { category, chooseCategory, quizJSON, fetchQuizJSON, reassignCategoryNumber, reassignQuizJSON } = useContext(Context);
    const [wasSubmitted, setWasSubmitted] = useState(false);

    useEffect(() => {
        document.title = "Choose Category - Trivial Trivia"
    }, [])

    const handleCategoryClick = (event) => {
        chooseCategory(event.target.value);
    }

    const handleStartClick = () => {
        if (!category) {
            alert("Please select a category!")
        }
        category && navigate("/Quiz");
        reassignCategoryNumber(category)
        chooseCategory(null);

        // TODO: if undefined or errors in general, default error page...
    }

    const fetchTTPQuiz = async () =>{
        const res = await axios.get("https://trivial-trivia-backend.herokuapp.com/getTTPquiz");
        console.log(res.data.results)
        reassignQuizJSON(res.data.results)
    }

    useEffect (()=>{
        if(category === 'TTP'){
            fetchTTPQuiz()
        }else{
            fetchQuizJSON();
        }
    },[category])

    return(
        <div className="selection-menu">
            <h1 className="header">Choose a Category</h1>
            <div className="buttons">
                <button className="button" onClick={handleCategoryClick} value="9">General Knowledge</button>
                <button className="button" onClick={handleCategoryClick} value="18">Science: Computer</button>
            </div>
            <div>
                <button className="button" onClick={handleCategoryClick} value="23">History</button>
                <button className="button" onClick={handleCategoryClick} value="20">Mythology</button>
            </div>
            <div>
                <button className="button" onClick={handleCategoryClick} value="27">Animals</button>
                <button className="button" onClick={handleCategoryClick} value="26">Celebrities</button>
            </div>
            <div>
                <button className="button" onClick={handleCategoryClick} value="15">Entertainment: Video Games</button>
                <button className="button" onClick={handleCategoryClick} value="TTP">TTP</button>
            </div>

            
            <button className="submit-button" onClick={handleStartClick}>Start</button>
        </div>
    )
}