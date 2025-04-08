import React from 'react';
import './AddToListModal.css';

function AddToListModal({ isOpen, onClose, movie, lists, onSelect }) {
    if (!isOpen || !movie) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Add "{movie.name}" to a List</h3>
                <ul className="list-selector">
                    {lists.map(list => (
                        <li key={list.id}>
                            <button onClick={() => onSelect(list.id)}>{list.title}</button>
                        </li>
                    ))}
                </ul>
                <button className="cancel" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default AddToListModal;
