import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
    return (
        <div className="home">
        <ul>
            <li>
            <Link to= '/Login'> LOGIN </Link>
            </li>
            <li>
            <Link to= '/Profile'> PROFILE</Link>
            </li>
        </ul>
        </div>
        )
}