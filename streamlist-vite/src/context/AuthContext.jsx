import { createContext, useContext, useState } from "react";
import { googleLogout } from '@react-oauth/google';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginWithGoogle = (googleUserInfo) => {
        setUser(googleUserInfo);
    };

    const logout = () => {
        googleLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
