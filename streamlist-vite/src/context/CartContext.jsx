import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) setCartItems(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        if ([1, 2, 3, 4].includes(item.id)) {
            const alreadyHasExclusive = cartItems.some(i => [1, 2, 3, 4].includes(i.id));
            if (alreadyHasExclusive) {
                alert('Only one of item ID 1–4 can be in the cart at a time.');
                return;
            }
        }

        const newItem = { ...item, amount: 1 };
        setCartItems(prev => [...prev, newItem]);
    };

    const removeFromCart = (index) => {
        const updated = cartItems.filter((_, i) => i !== index);
        setCartItems(updated);
    };

    const changeQuantity = (index, delta) => {
        const updated = [...cartItems];
        const item = updated[index];

        if ([5, 6, 7, 8].includes(item.id)) {
            item.amount = Math.max(1, item.amount + delta);
            setCartItems(updated);
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * (item.amount || 1), 0).toFixed(2);
    };

    const getCartCount = () => {
        return cartItems.reduce((sum, item) => sum + (item.amount || 1), 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            changeQuantity,
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
