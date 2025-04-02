import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LogoutButton from './LogoutButton';

function Navbar({ darkMode, toggleDarkMode }) {
    const { user } = useAuth();
    const { getCartCount } = useCart(); // ✅ use context value instead of state
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const displayName = user?.name?.split(' ')[0] || '';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav>
            <div className="nav-left">
                <ul>
                    <li><Link to="/"><span className="material-icons">home</span> Home</Link></li>
                    <li><Link to="/movies"><span className="material-icons">movie</span> Movies</Link></li>
                    <li><Link to="/favorites"><span className="material-icons">favorite</span> Favorites</Link></li>
                    <li><Link to="/watchlater"><span className="material-icons">bookmark</span> Watch Later</Link></li>
                    <li><Link to="/store"><span className="material-icons">store</span> Store</Link></li>
                    <li className="cart-link">
                        <Link to="/cart">
                            <span className="material-icons">shopping_cart</span> Cart
                            {getCartCount() > 0 && (
                                <span className="cart-badge">{getCartCount()}</span>
                            )}
                        </Link>
                    </li>
                    <li><Link to="/about"><span className="material-icons">info</span> About</Link></li>
                </ul>
            </div>

            <div className="nav-right">
                {user && (
                    <div className="user-dropdown" onClick={toggleDropdown} ref={dropdownRef}>
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="profile-pic clickable"
                        />
                        <span className="user-name clickable">{displayName}</span>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <LogoutButton />
                            </div>
                        )}
                    </div>
                )}
                <button className="toggle-button" onClick={toggleDarkMode}>
                    <span className="material-icons">
                        {darkMode ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
