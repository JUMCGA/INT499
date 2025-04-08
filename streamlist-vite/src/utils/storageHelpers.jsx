export const saveToStorage = (key, movie) => {
    const current = JSON.parse(localStorage.getItem(key)) || [];
    const exists = current.find((m) => m.id === movie.id);
    if (!exists) {
        current.push(movie);
        localStorage.setItem(key, JSON.stringify(current));
    }
};

export const removeFromStorage = (key, movieId) => {
    const current = JSON.parse(localStorage.getItem(key)) || [];
    const updated = current.filter((m) => m.id !== movieId);
    localStorage.setItem(key, JSON.stringify(updated));
};

export const getFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
};
