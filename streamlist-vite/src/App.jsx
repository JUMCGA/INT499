import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import StreamList from './components/StreamList.jsx';
import Movies from './components/Movies.jsx';
import Cart from './components/Cart.jsx';
import About from './components/About.jsx';

function AnimatedRoutes() {
    const location = useLocation(); // Needed for route-based animations

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><StreamList /></PageWrapper>} />
                <Route path="/movies" element={<PageWrapper><Movies /></PageWrapper>} />
                <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            </Routes>
        </AnimatePresence>
    );
}

// Wrapper Component for Animations
const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.5 }}
        className="page-container"
    >
        {children}
    </motion.div>
);

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    return (
        <Router>
            <div className="App">
                {/* Dark Mode Toggle Button */}
                <div className="toggle-container">
                    <button className="toggle-button" onClick={toggleDarkMode}>
                        <span className="material-icons">
                            {darkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                </div>
                
                {/* Navigation Menu */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                <span className="material-icons">home</span> StreamList
                            </Link>
                        </li>
                        <li>
                            <Link to="/movies">
                                <span className="material-icons">movie</span> Movies
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <span className="material-icons">shopping_cart</span> Cart
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                <span className="material-icons">info</span> About
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Animated Routes */}
                <AnimatedRoutes />
            </div>
        </Router>
    );
}

export default App;
