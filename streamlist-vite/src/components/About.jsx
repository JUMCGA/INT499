import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>About StreamList</h1>
            <p>
                <strong>StreamList</strong> is a fictional web application built for a fictional entertainment company as the final project of my Bachelor’s degree in Information Technology.
                This app represents everything I’ve learned throughout my academic journey — from user experience and interface design to full-stack functionality and API integration.
            </p>

            <p>
                StreamList was designed to help users easily search for movies, create personalized streaming lists, track their favorites, save watch-later titles, and even simulate purchases using a mock checkout system. It integrates data from The Movie Database (TMDB) and Watchmode APIs to display accurate movie information and streaming platform availability.
            </p>

            <p>
                This project uses modern development tools and technologies, including:
            </p>
            <ul>
                <li>React.js (Frontend Framework)</li>
                <li>Google OAuth (Authentication)</li>
                <li>TMDB & Watchmode APIs (Movie and streaming data)</li>
                <li>Crypto-JS (for client-side encryption simulation)</li>
                <li>LocalStorage (for managing user lists and transactions)</li>
            </ul>

            <p>
                Most importantly, this app marks the final project of my undergraduate journey. After years of learning, late nights, and coding challenges, I’m incredibly proud to say:
                <strong> I’ve officially completed my Bachelor’s in Information Technology!</strong>
            </p>

            <p>
                Thank you to my professors, peers, and everyone who supported me along the way. Whether you're here to browse a fake catalog or just checking out my work — I appreciate you.
            </p>

            <footer className="about-footer">
                <p>Made with passion, React, and a lot of coffee.</p>
                <p>Project by Justin McGarry | UAGC Class of 2025</p>
            </footer>
        </div>
    );
};

export default About;
