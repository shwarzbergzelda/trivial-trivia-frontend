import React from "react";
import { Link } from 'react-router-dom'
import '../styles/Home.css'

export default function Home(){
    return (
        <div className="home-text">
            <h1 className="start-header"><Link to='/Login'>Start</Link></h1>
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