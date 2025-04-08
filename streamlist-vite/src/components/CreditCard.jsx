import React from 'react';
import './CreditCard.css';

const CreditCard = ({ cardNumber, onChange }) => {
    return (
        <div className="credit-card-container">
            <label htmlFor="cardNumber">Credit Card Number</label>
            <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={onChange}
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                required
            />
        </div>
    );
};

export default CreditCard;
