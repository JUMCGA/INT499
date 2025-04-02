import React from 'react';
import { useCart } from '../context/CartContext';
import list from './data';
import './Store.css';

const Store = () => {
    const { addToCart } = useCart();

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    return (
        <div className="store-container">
            <h2>Store</h2>

            <div className="item-row">
                {list.slice(0, 4).map(item => (
                    <div key={item.id} className="item-card">
                        <img src={item.img} alt={item.service} />
                        <h3>{item.service}</h3>
                        <p>{item.serviceInfo}</p>
                        <p className="price">${item.price}</p>
                        <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            <div className="item-row">
                {list.slice(4, 8).map(item => (
                    <div key={item.id} className="item-card">
                        <img src={item.img} alt={item.service} />
                        <h3>{item.service}</h3>
                        <p>{item.serviceInfo}</p>
                        <p className="price">${item.price}</p>
                        <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Store;
