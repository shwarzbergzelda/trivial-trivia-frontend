import React from 'react';
import { Link } from "react-router-dom";
import logo from '../images/logo.png'
import profile from '../images/Profile.png'

export default function Navbar() {
    return(
        <>
            <nav className='navbar'>
                <a href='/'><img className='logo' src={logo} alt="Logo"></img></a>
                <a href='/Profile'><img className='profile' src={profile} alt="Profile"></img></a>
            </nav>
        </>
    )
}