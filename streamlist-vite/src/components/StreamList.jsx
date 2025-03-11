import React, { useState } from 'react';

function StreamList() {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Input:", input);
        setInput('');
    };

    return (
        <div className="page-container">
            <h1>StreamList Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a movie title..."
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default StreamList;
