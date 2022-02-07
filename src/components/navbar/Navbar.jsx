import './navbar.css';
import React from 'react';
import { Link } from "react-router-dom";
import Search from './search/Search';
function Navbar() {
    return (
        <div className='navbar'>
            <div className='leftNav'>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
            <div className='rightNav'>
                <Search/>
            </div>
        </div>
    );
}

export default Navbar;
