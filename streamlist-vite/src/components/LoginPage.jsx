import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        loginWithGoogle(decoded);
        navigate('/');
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Login with Google</h2>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    );
};

export default LoginPage;
