import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './MovieDetails.css';


const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [crew, setCrew] = useState([]);
    const [cast, setCast] = useState([]);
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

    if (!movie) return <p>Loading...</p>;

    const director = crew.find(person => person.job === 'Director');
    const writers = crew.filter(person => person.job === 'Writer' || person.department === 'Writing');

    return (
        <div className="movie-details">
            <button onClick={() => navigate('/movies')} className="back-button">
                ← Back to Search
            </button>
            {movie.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-details-poster"
                />
            )}

            <h2 className="movie-title">{movie.title}</h2>

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
