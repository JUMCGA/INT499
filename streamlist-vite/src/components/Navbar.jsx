import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ darkMode, toggleDarkMode }) {
    return (
        <nav>
            <ul>
                <li><Link to="/"><span className="material-icons">home</span> Home</Link></li>
                <li><Link to="/movies"><span className="material-icons">movie</span> Movies</Link></li>
                <li><Link to="/favorites"><span className="material-icons">favorite</span> Favorites </Link></li>
                <li><Link to="/watch-later"><span className="material-icons">bookmark</span> Watch Later</Link></li>
                <li><Link to="/cart"><span className="material-icons">shopping_cart</span> Cart</Link></li>
                <li><Link to="/about"><span className="material-icons">info</span> About</Link></li>
            </ul>
            {/* Dark Mode Toggle Button Outside <ul> for alignment */}
            <button className="toggle-button" onClick={toggleDarkMode}>
                <span className="material-icons">
                    {darkMode ? 'light_mode' : 'dark_mode'}
                </span>
            </button>
        </nav>
    );
}

export default Navbar;
