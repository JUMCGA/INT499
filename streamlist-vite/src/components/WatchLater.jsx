import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Movies.css';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const WatchLater = () => {
    const [watchLater, setWatchLater] = useState([]);
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('watchLater')) || [];
        setWatchLater(stored);
    }, []);

    const toggleWatchLater = (movie) => {
        const exists = watchLater.some((m) => m.id === movie.id);
        const updated = exists
            ? watchLater.filter((m) => m.id !== movie.id)
            : [...watchLater, movie];

        setWatchLater(updated);
        localStorage.setItem('watchLater', JSON.stringify(updated));
    };

    const toggleFavorite = (movie) => {
        const exists = favorites.some((fav) => fav.id === movie.id);
        const updated = exists
            ? favorites.filter((fav) => fav.id !== movie.id)
            : [...favorites, movie];

        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    return (
        <div className="page-container">
            <h2>Watch Later</h2>
            {watchLater.length === 0 ? (
                <p>You haven’t saved any movies to watch later.</p>
            ) : (
                <div className="movies-grid">
                    {watchLater.map((movie) => (
                        <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card">
                            {movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                            ) : (
                                <div className="movie-placeholder">No Image</div>
                            )}

                            <div className="movie-actions">
                                <button onClick={(e) => { e.preventDefault(); toggleFavorite(movie); }}>
                                    {favorites.some((fav) => fav.id === movie.id) ? <FaHeart color="#E63946" /> : <FaRegHeart />}
                                </button>
                                <button onClick={(e) => { e.preventDefault(); toggleWatchLater(movie); }}>
                                    {watchLater.some((w) => w.id === movie.id) ? <FaBookmark color="#A98BCC" /> : <FaRegBookmark />}
                                </button>
                            </div>

                            <h3>{movie.title}</h3>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WatchLater;
