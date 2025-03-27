import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Movies.css';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const GENRE_MAP = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
};

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
    const [watchLater, setWatchLater] = useState(() => JSON.parse(localStorage.getItem('watchLater')) || []);
    const API_KEY = '84f3b82b613c29aa7bef6d2644d174fc';

    useEffect(() => {
        const fetchMovies = async () => {
            if (searchTerm.trim() === '') return;

            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`
                );
                const data = await response.json();
                setMovies(data.results || []);
            } catch (error) {
                console.error('Search failed:', error);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounce = setTimeout(() => {
            fetchMovies();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const toggleFavorite = (movie) => {
        const exists = favorites.some((fav) => fav.id === movie.id);
        const updated = exists
            ? favorites.filter((fav) => fav.id !== movie.id)
            : [...favorites, movie];

        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    const toggleWatchLater = (movie) => {
        const exists = watchLater.some((w) => w.id === movie.id);
        const updated = exists
            ? watchLater.filter((w) => w.id !== movie.id)
            : [...watchLater, movie];

        setWatchLater(updated);
        localStorage.setItem('watchLater', JSON.stringify(updated));
    };

    return (
        <div className="page-container">
            <h2>Search Movies</h2>
            <input
                className="search-input"
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading && <p>Loading...</p>}

            <div className="movies-grid">
                {movies.map((movie) => (
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

                        <div className="movie-meta">
                            <span className="rating-badge">⭐ {movie.vote_average?.toFixed(1)}</span>
                            <div className="genre-badges">
                                {movie.genre_ids?.slice(0, 2).map((id) => (
                                    <span key={id} className="genre-badge">{GENRE_MAP[id]}</span>
                                ))}
                            </div>
                        </div>

                        <h3 data-full-title={movie.title}>{movie.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Movies;
