import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@mui/material';

import Header from './components/Header';
import NavBar from './components/NavBar';
import AppRouter from './routes/AppRouter';

import libraryImg from './assets/images/library.jpg';
import booksImg from './assets/images/books.webp';

import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { AuthProvider } from './components/auth/auth';

// styles for inital page
const useStyles = makeStyles({
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
  },
  initialPage: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  aboutPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  image: {
    width: '50%',
    flexDirection: 'end'
  },
  title: {
    color: 'black',
    fontSize: '10vh'
  },
  subtitle: {
    width: '70%',
    textAlign: 'center',
  },
  toMainPage: {
    color: 'brown',
    textDecoration: 'underline',
    cursor: 'pointer',
  }
});

function App() {
  const classes = useStyles();
  const [showMainPage, setShowMainPage] = useState(false);

  // const mainPage = () => {
  return (
    <AuthProvider>
      <NotificationContainer />

      <Grid container>
        <NavBar />
        <Grid item xs={10}>
          <Grid container direction="column">
            <Grid item>
              <Header />
            </Grid>
            <Grid item xs>
              <AppRouter />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthProvider>
  );

}



export default App;
