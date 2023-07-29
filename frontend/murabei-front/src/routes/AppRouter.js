import { useContext } from 'react';
import { AuthContext } from '../components/auth/auth'; // ajuste aqui se necessário
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Book from '../components/Book';
import Author from '../components/Author';
import Login from '../components/Login';
import LoginScreen from '../components/LoginScreen';
import Subject from '../components/Subject';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <LoginScreen />;
}

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/author" element={<ProtectedRoute><Author /></ProtectedRoute>} />
            <Route path="/book" element={<ProtectedRoute><Book /></ProtectedRoute>} />
            <Route path="/subject" element={<ProtectedRoute><Subject /></ProtectedRoute>} />
        </Routes>
    );
}

export default AppRouter;