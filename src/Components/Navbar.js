import React from 'react';
import logo from '../images/logo.png'
import profile from '../images/Profile.png'
import { Link } from 'react-router-dom'
import "../styles/Navbar.css"

export default function Navbar() {
    return(
        <nav className='navbar'>
            <Link to='/'><img className='logo' src={logo} alt="Logo"></img></Link>
            <div className="navbar-profile">
                <button className="navbar-button"><Link to='/Leaderboard'>Leaderboard</Link></button>
                <button className="navbar-button"><Link to='/Category'>Take A Quiz</Link></button>
                <Link to='/Profile'><img className='profile' src={profile} alt="Profile"></img></Link>
            </div>
        </nav>
    )
}