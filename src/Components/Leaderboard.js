import React, { useEffect, useState } from 'react';
import LightningAlt from '../images/Lightning-alt.png';
import axios from 'axios';

export default function Leaderboard(){

    const [leaderboardData, setleaderboardData] = useState([])
    const [selectValue, setSelectValue] = useState('TTP')

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
        setSelectValue(e.target.value)
    }

    let count = 1;

    return(
        <>
        <img className='lightning-image' src={LightningAlt}></img>
        <div className="leaderboard-text">Leaderboard</div>
        {
        leaderboardData && leaderboardData.map(item =>{
            return(
                <div className="leaderboard-rank">{count++}|{item.userUserName}|{item.category}|{item.score}</div>
            )
        })}
        <select value={selectValue} onChange={handleChange} id="select-category">
        <option value="TTP">TTP</option>
        <option value="Coffee">Coffee</option>
        <option value="History">History</option>
        <option value="1">test1</option>
        <option value="2" selected="selected">test2</option>
        <option value="3">test3</option>
        </select>
        
        
        </>
    )

}