import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="634585739538-5l5616trtqiamdcl4c3028t3m0agettn.apps.googleusercontent.com">
            <CartProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </CartProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
