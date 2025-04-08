import React, { useState, useEffect } from 'react';
import './StreamList.css';
import CreateListModal from './CreateListModal.jsx';
import MovieCard from './MovieCard.jsx';
import AddToListModal from './AddToListModal.jsx';
import SavedMovieCard from './SavedMovieCard.jsx';

const TMDB_API_KEY = '84f3b82b613c29aa7bef6d2644d174fc';
const WATCHMODE_API_KEY = 'QeYGnAWfYR7NQC6NYUqmsRPQpUE4mnczugJjq1fb';

function StreamList() {
    const [lists, setLists] = useState(() => {
        const stored = localStorage.getItem('streamLists');
        return stored ? JSON.parse(stored) : [];
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        localStorage.setItem('streamLists', JSON.stringify(lists));
    }, [lists]);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        const res = await fetch(
            `https://api.watchmode.com/v1/search/?apiKey=${WATCHMODE_API_KEY}&search_field=name&search_value=${encodeURIComponent(searchQuery)}`
        );
        const data = await res.json();
        const results = data.title_results || [];

        const enrichedResults = await Promise.all(
            results.map(async (item) => {
                if (!item.tmdb_id) return { ...item, poster: null };

                try {
                    const tmdbRes = await fetch(`https://api.themoviedb.org/3/movie/${item.tmdb_id}?api_key=${TMDB_API_KEY}`);
                    const tmdbData = await tmdbRes.json();
                    return {
                        ...item,
                        poster: tmdbData.poster_path
                            ? `https://image.tmdb.org/t/p/w300${tmdbData.poster_path}`
                            : null,
                    };
                } catch (err) {
                    console.error(`Failed to fetch TMDB poster for ${item.name}`);
                    return { ...item, poster: null };
                }
            })
        );

        setSearchResults(enrichedResults);
    };

    const getStreamingSources = async (watchmode_id) => {
        const res = await fetch(
            `https://api.watchmode.com/v1/title/${watchmode_id}/sources/?apiKey=${WATCHMODE_API_KEY}`
        );
        return await res.json();
    };

    const handleCreateList = ({ title, description }) => {
        const newList = {
            id: Date.now().toString(),
            title,
            description,
            movies: [],
        };
        setLists(prev => [...prev, newList]);
        setShowCreateModal(false);
    };

    const handleAddToListClick = (movie) => {
        setSelectedMovie(movie);
        setShowAddModal(true);
    };

    const normalizePlatformName = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('hulu')) return 'Hulu';
        if (lower.includes('prime') || lower.includes('amazon')) return 'Amazon';
        if (lower.includes('apple')) return 'AppleTV';
        if (lower.includes('netflix')) return 'Netflix';
        if (lower.includes('max') || lower.includes('hbo')) return 'Max';
        if (lower.includes('youtube')) return 'YouTube';
        return null;
    };

    const handleAddMovieToList = async (listId) => {
        if (!selectedMovie) return;

        const sources = await getStreamingSources(selectedMovie.id);
        const allowedPlatforms = ['Hulu', 'Amazon', 'AppleTV', 'Netflix', 'Max', 'YouTube'];
        const uniquePlatforms = [];

        sources.forEach(src => {
            if (!['subscription', 'free', 'rent', 'buy'].includes(src.type)) return;

            const normalized = normalizePlatformName(src.name);
            if (
                normalized &&
                allowedPlatforms.includes(normalized) &&
                !uniquePlatforms.find(p => p.name === normalized)
            ) {
                uniquePlatforms.push({
                    name: normalized,
                    type: src.type,
                    logo: src.logo_100px,
                });
            }
        });

        const movieEntry = {
            id: selectedMovie.id,
            tmdb_id: selectedMovie.tmdb_id,
            title: selectedMovie.name,
            poster: selectedMovie.poster,
            platforms: uniquePlatforms,
        };

        setLists(prev =>
            prev.map(list =>
                list.id === listId
                    ? { ...list, movies: [...list.movies, movieEntry] }
                    : list
            )
        );

        setShowAddModal(false);
        setSelectedMovie(null);
    };

    const handleDeleteList = (listId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this list?');
        if (confirmDelete) {
            setLists(prev => prev.filter(list => list.id !== listId));
        }
    };

    return (
        <div className="page-container">
            <h1>StreamList</h1>

            <button onClick={() => setShowCreateModal(true)}>+ New List</button>
            <CreateListModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateList}
            />

            <div className="search-section">
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a movie"
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="results">
                {searchResults.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onAdd={handleAddToListClick}
                    />
                ))}
            </div>

            <AddToListModal
                isOpen={showAddModal}
                movie={selectedMovie}
                lists={lists}
                onClose={() => setShowAddModal(false)}
                onSelect={handleAddMovieToList}
            />

            <div className="lists-section">
                {lists.map((list) => (
                    <div key={list.id} className="list-card">
                        <div className="list-header">
                            <div>
                                <h2>{list.title}</h2>
                                <p className="list-description">{list.description}</p>
                            </div>
                            <div className="list-actions">
                                <button onClick={() => handleDeleteList(list.id)}>🗑 Delete</button>
                            </div>
                        </div>

                        <div className="saved-movies">
                            {list.movies.map((movie, idx) => (
                                <SavedMovieCard
                                    key={idx}
                                    movie={movie}
                                    onRemove={() => {
                                        setLists(prev =>
                                            prev.map(l =>
                                                l.id === list.id
                                                    ? {
                                                        ...l,
                                                        movies: l.movies.filter((_, i) => i !== idx)
                                                    }
                                                    : l
                                            )
                                        );
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StreamList;
