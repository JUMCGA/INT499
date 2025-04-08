import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetails.css';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [crew, setCrew] = useState([]);
    const [cast, setCast] = useState([]);
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
    const [watchLater, setWatchLater] = useState(() => JSON.parse(localStorage.getItem('watchLater')) || []);
    const [showFullCast, setShowFullCast] = useState(false);
    const API_KEY = '84f3b82b613c29aa7bef6d2644d174fc';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const resDetails = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
                const movieData = await resDetails.json();
                setMovie(movieData);

                const resCredits = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
                const creditsData = await resCredits.json();
                setCrew(creditsData.crew);
                setCast(creditsData.cast);
            } catch (error) {
                console.error('Failed to fetch movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const isFavorite = favorites.some(f => f.id === movie?.id);
    const isWatchLater = watchLater.some(w => w.id === movie?.id);

    const toggleFavorite = () => {
        if (!movie) return;
        const updated = isFavorite
            ? favorites.filter(f => f.id !== movie.id)
            : [...favorites, { ...movie, poster: movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : null }];
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    const toggleWatchLater = () => {
        if (!movie) return;
        const updated = isWatchLater
            ? watchLater.filter(w => w.id !== movie.id)
            : [...watchLater, { ...movie, poster: movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : null }];
        setWatchLater(updated);
        localStorage.setItem('watchLater', JSON.stringify(updated));
    };

    if (!movie) return <p>Loading...</p>;

    const director = crew.find(person => person.job === 'Director');
    const writers = crew.filter(person => person.job === 'Writer' || person.department === 'Writing');

    return (
        <div className="movie-details">
            <button onClick={() => navigate(-1)} className="back-button">← Back</button>

            {movie.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-details-poster"
                />
            )}

            <h2 className="movie-title">{movie.title}</h2>

            <div className="movie-actions">
                <button onClick={toggleFavorite}>
                    {isFavorite ? <FaHeart color="#E63946" /> : <FaRegHeart />}
                </button>
                <button onClick={toggleWatchLater}>
                    {isWatchLater ? <FaBookmark color="#A98BCC" /> : <FaRegBookmark />}
                </button>
            </div>

            <div className="movie-badges">
                <span className="rating-badge">⭐ {movie.vote_average?.toFixed(1)}</span>
                <div className="genre-badges">
                    {movie.genres?.map((genre) => (
                        <span key={genre.id} className="genre-badge">{genre.name}</span>
                    ))}
                </div>
            </div>

            <p><strong>Release Date:</strong> {formatDate(movie.release_date)}</p>
            <p><strong>Director:</strong> {director ? director.name : 'N/A'}</p>
            <p><strong>Writer(s):</strong> {writers.map(w => w.name).join(', ') || 'N/A'}</p>
            <p><strong>Description:</strong> {movie.overview}</p>

            <h3>Top Billed Cast</h3>
            <div className="cast-grid">
                {(showFullCast ? cast : cast.slice(0, 5)).map(actor => (
                    <div key={actor.cast_id} className="cast-member">
                        {actor.profile_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                alt={actor.name}
                                className="cast-photo"
                            />
                        ) : (
                            <div className="cast-photo placeholder">No Photo</div>
                        )}
                        <p><strong>{actor.name}</strong></p>
                        <p>{actor.character}</p>
                    </div>
                ))}
            </div>
            {cast.length > 5 && (
                <button onClick={() => setShowFullCast(!showFullCast)}>
                    {showFullCast ? 'Show Less' : 'Show Full Cast'}
                </button>
            )}
        </div>
    );
};

export default MovieDetails;
