import React from "react";
import { Link } from "react-router-dom";

export default function Category(){

    return(
        <div>
            <h1>CATEGORY</h1>
            <div>
                <button>General Knowledge</button>
                <button>Science : Computer</button>
            </div>
            <div>
                <button>History</button>
                <button>Mythology</button>
            </div>
            <div>
                <button>Animals</button>
                <button>Celebrities</button>
            </div>
            
            <button>Start</button>
        </div>
    )
}