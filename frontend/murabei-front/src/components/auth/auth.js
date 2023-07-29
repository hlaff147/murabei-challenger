import React, { createContext, useState } from 'react';
import { loginApi } from '../../api/login/loginApi';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async ({ username, password }) => {
        return loginApi({ email: username, password })
            .then(data => {
                if (data.message === 'Successful login.') {
                    setIsAuthenticated(true);
                    return true;
                } else {
                    // Se o servidor retorna algo diferente, assumimos que o login falhou
                    setIsAuthenticated(false);
                    return false;
                }
            })
            .catch(error => {
                // Se houve um erro na chamada à API, também assumimos que o login falhou
                console.error(error);
                setIsAuthenticated(false);
                return false;
            });
    };


    const logout = () => {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};
