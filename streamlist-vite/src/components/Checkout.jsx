import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CreditCard from './CreditCard';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const [cardNumber, setCardNumber] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleCardInput = (e) => {
        let value = e.target.value.replace(/\D/g, '').slice(0, 16); // digits only, 16 max
        value = value.replace(/(.{4})/g, '$1 ').trim(); // format 1234 5678 ...
        setCardNumber(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cardNumber.length !== 19) {
            alert('Please enter a valid 16-digit credit card number.');
            return;
        }

        localStorage.setItem('creditCard', cardNumber);
        clearCart();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="checkout-container">
                <h2>Thank you for your order!</h2>
                <p>Your card has been charged ${getCartTotal()}.</p>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>

            <div className="order-summary">
                <h3>Order Summary</h3>
                <ul>
                    {cartItems.map((item, idx) => (
                        <li key={idx}>
                            {item.service} × {item.amount || 1} — ${item.price * (item.amount || 1)}
                        </li>
                    ))}
                </ul>
                <p><strong>Total:</strong> ${getCartTotal()}</p>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
                <CreditCard cardNumber={cardNumber} onChange={handleCardInput} />
                <button type="submit">Submit Payment</button>
            </form>
        </div>
    );
};

export default Checkout;
