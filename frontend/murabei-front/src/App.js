import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import AppRouter from './routes/AppRouter';
import { Grid } from '@mui/material';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
