import React, { useContext, useEffect, useState } from 'react';
import { Context } from './Context'
import { useNavigate } from 'react-router-dom'

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
        <div>
            <h1>CATEGORY</h1>
            <div>
                <button onClick={handleCategoryClick} value="9">General Knowledge</button>
                <button onClick={handleCategoryClick} value="18">Science: Computer</button>
            </div>
            <div>
                <button onClick={handleCategoryClick} value="23">History</button>
                <button onClick={handleCategoryClick} value="20">Mythology</button>
            </div>
            <div>
                <button onClick={handleCategoryClick} value="27">Animals</button>
                <button onClick={handleCategoryClick} value="26">Celebrities</button>
            </div>
            
            <button onClick={handleStartClick}>Start</button>
        </div>
    )
}