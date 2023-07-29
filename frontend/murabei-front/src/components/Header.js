import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AuthContext } from './auth/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
      logout();
      navigate('/');
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Murabei Library
                </Typography>
                {isAuthenticated && (
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
