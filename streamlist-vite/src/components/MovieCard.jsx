import React from 'react';
import './MovieCard.css';
import { saveToStorage } from '../utils/storageHelpers';

function MovieCard({ movie, onAdd }) {
    const { name, year, poster } = movie;

    const handleAddToWatchlist = () => {
        saveToStorage('watchlist', movie);
    };

    const handleAddToFavorites = () => {
        saveToStorage('favorites', movie);
    };

    return (
        <div className="movie-card">
            <img
                src={poster || 'https://via.placeholder.com/100x150?text=No+Image'}
                alt={name}
                className="movie-poster"
            />
            <div className="movie-info">
                <h3>{name}</h3>
                {year && <p className="movie-year">{year}</p>}

                <button onClick={() => onAdd(movie)}>Add to Active List</button>
                <button onClick={handleAddToWatchlist}>+ Watchlist</button>
                <button onClick={handleAddToFavorites}>❤️ Favorite</button>
            </div>
        </div>
    );
}

export default MovieCard;
