import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
    const { logout } = useAuth();

    return (
        <button onClick={logout} style={{ marginLeft: '1rem' }}>
            Log Out
        </button>
    );
};

export default LogoutButton;
