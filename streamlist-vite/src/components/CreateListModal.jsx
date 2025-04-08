import React, { useState } from 'react';
import './CreateListModal.css';

function CreateListModal({ isOpen, onClose, onCreate }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (!title.trim()) return;
        onCreate({ title, description });
        setTitle('');
        setDescription('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create New List</h2>
                <input
                    type="text"
                    placeholder="List Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Optional description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="modal-actions">
                    <button onClick={handleSubmit}>Create</button>
                    <button className="cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default CreateListModal;
