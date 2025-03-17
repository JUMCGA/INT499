import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import StreamList from './StreamList.jsx';
import Movies from './Movies.jsx';
import Cart from './Cart.jsx';
import About from './About.jsx';

function AppRoutes() {
    const location = useLocation();

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

const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.3 }}
        className="page-container"
    >
        {children}
    </motion.div>
);

export default AppRoutes;
