import React, { useEffect, useState } from 'react';
import LightningAlt from '../images/Lightning-alt.png';
import axios from 'axios';
import "../styles/Leaderboard.css"

export default function Leaderboard(){

    const [leaderboardData, setleaderboardData] = useState([])
    const [selectValue, setSelectValue] = useState('default')

    useEffect(() => {
        document.title = "Leaderboard - Trivial Trivia"
    }, [])

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const res = await axios.get(`https://trivial-trivia-backend.herokuapp.com/quizscore/${selectValue}/getTopTen`);
            setleaderboardData(res.data)
        }

        fetchLeaderboard();

    }, [selectValue])


    function handleChange(e){
        setSelectValue(e.target.value);
    }

    let count = 1;

    return(
        <>
        <div className="page-header">
            <img className='lightning-image' src={LightningAlt}></img>
            <h1 className="leaderboard-header">Leaderboard</h1>

            <label className="select-category-label">Select A Leaderboard Category: </label>
                <select value={selectValue} onChange={handleChange} className="select-category">
                    <option value="default">Select A Category</option>
                    <option value="General Knowledge">General Knowledge</option>
                    <option value="Science: Computer">Science: Computer</option>
                    <option value="History">History</option>
                    <option value="Mythology">Mythology</option>
                    <option value="Animals" selected="selected">Animals</option>
                    <option value="Celebrities">Celebrities</option>
                    <option value="Entertainment: Video Games">Entertainment: Video Games</option>
                    <option value="TTP">TTP</option>
                </select>
        </div>

            {(selectValue != 'default') && (leaderboardData.length > 0) &&
                <div className="leaderboard-headers">
                    <h1 className="leaderboard-header-1">Name</h1>
                    <h1 className="leaderboard-header-2">High Score</h1>
                </div>
            }

            <div className="leaderboard-table">
                    {
                    leaderboardData && leaderboardData.map(item =>{
                        return(
                            <div className="leaderboard-row">
                                <div className="leaderboard-rank">{count++}.&nbsp;</div>
                                <div className="leaderboard-user-and-score">
                                    <div className="leaderboard-userName">{item.userUserName}</div>
                                    <div className="leaderboard-score">{item.score}</div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )

}