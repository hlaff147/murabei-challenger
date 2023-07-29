import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/auth/auth';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginScreen = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({username: '', password: ''});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await login(credentials);

    if (result) {
      navigate('/book');
    } else {
      // Handle error here
      console.log("Failed to log in.");
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Email"
          name="username"
          autoFocus
          value={credentials.username} 
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={credentials.password} 
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Log In
        </Button>
      </form>
    </Paper>
  );
};

export default LoginScreen;
