import React, { useContext, useEffect, useState } from 'react';
import { Context } from './Context'
import { useNavigate } from 'react-router-dom'
import '../styles/Selection.css'

export default function Category(){
    const navigate = useNavigate();

    const { category, chooseCategory, quizJSON, fetchQuizJSON } = useContext(Context);
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const handleCategoryClick = (event) => {
        chooseCategory(event.target.value);
    }

    const handleStartClick = () => {
        if (!category) {
            alert("Please select a category!")
        }
        category && navigate("/Quiz");
        chooseCategory(null);

        // TODO: if undefined or errors in general, default error page...
    }

    useEffect (()=>{
        fetchQuizJSON();
    },[category])

    return(
        <div className="selection-menu">
            <h1 className="header">Choose a Category</h1>
            <div>
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
            
            <button className="submit-button" onClick={handleStartClick}>Start</button>
        </div>
    )
}