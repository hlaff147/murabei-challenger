import { useContext } from 'react';
import { AuthContext } from '../components/auth/auth'; // ajuste aqui se necessário
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Book from '../components/Book';
import Author from '../components/Author';
import Login from '../components/Login';
import LoginScreen from '../components/LoginScreen';
import Subject from '../components/Subject';

function AppRouter() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/author" element={isAuthenticated ? <Author /> : <LoginScreen />} />
            <Route path="/book" element={isAuthenticated ? <Book /> : <LoginScreen />} />
            <Route path="/subject" element={isAuthenticated ? <Subject /> : <LoginScreen />} />
        </Routes>

    );
}

export default AppRouter;