import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/AppRoutes.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css';
import './components/Navbar.css';


function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    return (
        <Router>
            <div className="App">
                {/*Pass darkMode and toggleDarkMode as props */}
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <AppRoutes />
            </div>
        </Router>
    );
}

export default App;
