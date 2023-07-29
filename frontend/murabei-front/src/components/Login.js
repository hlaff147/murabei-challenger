import { useContext } from 'react';
import { AuthContext } from './auth/auth';

function Login() {
    const { login } = useContext(AuthContext);

    const handleSubmit = () => {
        login();
    };

    return (
        <button onClick={handleSubmit}>Login</button>
    );
}

export default Login;