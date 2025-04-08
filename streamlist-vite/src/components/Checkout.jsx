import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CreditCard from './CreditCard';
import './Checkout.css';
import CryptoJS from 'crypto-js';
import { useAuth } from '../context/AuthContext';


const SECRET_KEY = 'mySuperSecretKey123'; // For dev only

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const [cardNumber, setCardNumber] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [finalTotal, setFinalTotal] = useState(0);

      const { user } = useAuth();
    const username = user?.email || user?.name || 'Unknown User';

    const handleCardInput = (e) => {
        let value = e.target.value.replace(/\D/g, '').slice(0, 16);
        value = value.replace(/(.{4})/g, '$1 ').trim();
        setCardNumber(value);
    };

    const generateTransactionId = () => {
        return 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const maskCardNumber = (number) => {
        const digitsOnly = number.replace(/\s/g, '');
        const last4 = digitsOnly.slice(-4);
        return '**** **** **** ' + last4;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cardNumber.length !== 19) {
            alert('Please enter a valid 16-digit credit card number.');
            return;
        }

        const total = getCartTotal();
        const txnId = generateTransactionId();
        const encryptedCard = CryptoJS.AES.encrypt(cardNumber, SECRET_KEY).toString();
        const timestamp = new Date().toISOString();

        // 1. Encrypted transaction
        const paymentDetails = {
            encryptedCard,
            total,
            transactionId: txnId,
            timestamp,
        };
        localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));

        // 2. Human-readable masked summary
        const summary = {
            transactionId: txnId,
            username,
            timestamp,
            maskedCard: maskCardNumber(cardNumber),
            amount: formatCurrency(total),
        };

        // Append to local log
        const existingLog = JSON.parse(localStorage.getItem('paymentSummaryLog')) || [];
        existingLog.push(summary);
        localStorage.setItem('paymentSummaryLog', JSON.stringify(existingLog));

        // Save for confirmation page
        setTransactionId(txnId);
        setFinalTotal(total);
        clearCart();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="checkout-container">
                <h2>Thank you for your order!</h2>
                <p>Your card has been charged <strong>{formatCurrency(finalTotal)}</strong>.</p>
                <p>Transaction ID: <code>{transactionId}</code></p>
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
                            {item.service} × {item.amount || 1} — {formatCurrency(item.price * (item.amount || 1))}
                        </li>
                    ))}
                </ul>
                <p><strong>Total:</strong> {formatCurrency(getCartTotal())}</p>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
                <CreditCard cardNumber={cardNumber} onChange={handleCardInput} />
                <button type="submit">Submit Payment</button>
            </form>
        </div>
    );
};

export default Checkout;
