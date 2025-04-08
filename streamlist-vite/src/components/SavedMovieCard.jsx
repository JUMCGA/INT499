import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SavedMovieCard.css';

function SavedMovieCard({ movie, onRemove }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (movie.tmdb_id) {
            navigate(`/movie/${movie.tmdb_id}`);
        } else {
            alert('This movie is missing a TMDB ID and cannot be opened.');
        }
    };

    return (
        <div className="saved-movie-card">
            <img
                src={movie.poster || 'https://via.placeholder.com/100x150?text=No+Image'}
                alt={movie.title}
                className="saved-poster"
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
            />
            <div className="saved-info">
                <h3 onClick={handleClick} style={{ cursor: 'pointer' }}>{movie.title}</h3>
                <div className="platforms">
                    {movie.platforms.map((p, idx) => (
                        <span key={idx} className={`badge ${p.type}`}>
                            {p.logo && (
                                <img src={p.logo} alt={p.name} style={{ height: '16px', marginRight: '4px' }} />
                            )}
                            {p.name}
                        </span>
                    ))}
                </div>
                <button className="remove-btn" onClick={onRemove}>Remove</button>
            </div>
        </div>
    );
}

export default SavedMovieCard;
