import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import {Context} from './Context'

export default function Home(){

    // const {isLogin} = useContext(Context);
    let navigate = useNavigate();

    return (
        <div className="home-text">
            <h1 className="start-header"><Link to='/SignOrGuest'>Start</Link></h1>
            <h5 className="description-header">Battle of the Trivias</h5>
        </div>
    )
}
// <div className="home">
// <ul>
//     <li>
//         <Link to='/Login'> LOGIN </Link>
//     </li>
//     <li>
//         <Link to='/Profile'> PROFILE</Link>
//     </li>
//     <li>
//         <Link to='/Category'> CATEGORY</Link>
//     </li>
// </ul>
// </div>