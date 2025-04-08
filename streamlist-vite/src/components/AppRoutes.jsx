import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const StreamList = lazy(() => import('./StreamList.jsx'));
const Movies = lazy(() => import('./Movies.jsx'));
const Cart = lazy(() => import('./Cart.jsx'));
const About = lazy(() => import('./About.jsx'));
const MovieDetails = lazy(() => import('./MovieDetails.jsx'));
const Favorites = lazy(() => import('./Favorites.jsx'));
const WatchLater = lazy(() => import('./WatchLater.jsx'));
const LoginPage = lazy(() => import('./LoginPage.jsx'));
const PrivateRoute = lazy(() => import('./PrivateRoute.jsx'));
const Store = lazy(() => import('./Store.jsx'));
const Checkout = lazy(() => import('./Checkout.jsx'));

function AppRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={<div className="loader">Loading...</div>}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/login" element={<LoginPage />} />

                    <Route
                        path="/"
                        element={<PrivateRoute><PageWrapper><StreamList /></PageWrapper></PrivateRoute>}
                    />

                    <Route
                        path="/movies"
                        element={<PrivateRoute><PageWrapper><Movies /></PageWrapper></PrivateRoute>}
                    />

                    <Route
                        path="/cart"
                        element={<PrivateRoute><PageWrapper><Cart /></PageWrapper></PrivateRoute>}
                    />

                    <Route
                        path="/store"
                        element={<PrivateRoute><PageWrapper><Store /></PageWrapper></PrivateRoute>}
                    />

                    <Route
                        path="/about"
                        element={<PrivateRoute><PageWrapper><About /></PageWrapper></PrivateRoute>}
                    />

                    <Route
                        path="/movie/:id"
                        element={<PrivateRoute><PageWrapper><MovieDetails /></PageWrapper></PrivateRoute>}
                    />

                    <Route
                        path="/favorites"
                        element={<PrivateRoute><PageWrapper><Favorites /></PageWrapper></PrivateRoute>}
                    />

                    <Route
                        path="/watchlater"
                        element={<PrivateRoute><PageWrapper><WatchLater /></PageWrapper></PrivateRoute>}
                    />

                    <Route
                        path="/checkout"
                        element={<PrivateRoute><PageWrapper><Checkout /></PageWrapper></PrivateRoute>}
                    />
                </Routes>
            </Suspense>
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
