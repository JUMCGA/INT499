import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        changeQuantity,
        getCartTotal
    } = useCart();

    const navigate = useNavigate();

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item, idx) => (
                            <div key={idx} className="cart-item">
                                <img src={item.img} alt={item.service} />
                                <div className="info">
                                    <h3>{item.service}</h3>
                                    <p>{item.serviceInfo}</p>
                                    <p>${item.price} each</p>
                                    {[5, 6, 7, 8].includes(item.id) && (
                                        <div className="quantity-controls">
                                            <button onClick={() => changeQuantity(idx, -1)}>-</button>
                                            <span>{item.amount}</span>
                                            <button onClick={() => changeQuantity(idx, 1)}>+</button>
                                        </div>
                                    )}
                                    <p><strong>Subtotal: ${(item.price * (item.amount || 1)).toFixed(2)}</strong></p>
                                </div>
                                <button className="remove-btn" onClick={() => removeFromCart(idx)}>Remove</button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Total: ${getCartTotal()}</h3>
                        <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                            Go to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
