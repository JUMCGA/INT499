import React, { useState } from 'react';
import './StreamList.css';
import { Icon } from '@mui/material'; // Material UI Icons

function StreamList() {
    const [input, setInput] = useState('');
    const [items, setItems] = useState([]); // Store user inputs
    const [editingIndex, setEditingIndex] = useState(null); // Track which item is being edited

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        if (editingIndex !== null) {
            // If editing, update the existing item
            const updatedItems = [...items];
            updatedItems[editingIndex].text = input;
            setItems(updatedItems);
            setEditingIndex(null); // Exit edit mode
        } else {
            // Otherwise, add a new item
            setItems([...items, { text: input, completed: false }]);
        }

        setInput(''); // Clear input field
    };

    // Toggle completion status
    const toggleComplete = (index) => {
        const updatedItems = [...items];
        updatedItems[index].completed = !updatedItems[index].completed;
        setItems(updatedItems);
    };

    // Delete an item
    const deleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    // Enter edit mode
    const startEditing = (index) => {
        setInput(items[index].text);
        setEditingIndex(index);
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
                <button type="submit">
                    {editingIndex !== null ? "Update" : "Submit"}
                </button>
            </form>

            {/* Display user inputs */}
            <ul className="streamlist">
                {items.map((item, index) => (
                    <li key={index} className={item.completed ? 'completed' : ''}>
                        <span>{item.text}</span>
                        <div className="actions">
                            <button onClick={() => toggleComplete(index)}>
                                <Icon>{item.completed ? 'check_circle' : 'radio_button_unchecked'}</Icon>
                            </button>
                            <button onClick={() => startEditing(index)}>
                                <Icon>edit</Icon> {/* Edit Icon */}
                            </button>
                            <button onClick={() => deleteItem(index)}>
                                <Icon>delete</Icon> {/* Delete Icon */}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StreamList;
