import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Button, TextField, Snackbar, CircularProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  "wrapper": {
    textAlign: "center"
  },
  "loginInput": {
    width: "400px",
    margin: "5px"
  }
});

function Login() {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState({
    username: "",
    password: "",
    missing: false,
    invalid: false,
    loading: true,
    loggedin: false
  });

  useEffect(() => {
    axios.get("/api/me").then(res => {
      setState({...state, loading: false, loggedin: true });
    }).catch(err => {
      setState({...state, loading: false, loggedin: false });
    });
  }, []); 

  const missingClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, missing: false });
  };

  const invalidClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, invalid: false });
  };

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('/api/auth/', {
      username: state.username,
      password: state.password
    }).then(res => {
      history.push('/');
    }).catch(err => {
      if (err.response.status === 400) {
        setState({ ...state, missing: true });
      }
      if (err.response.status === 401) {
        setState({ ...state, invalid: true });
      }
    });
  }

  if (state.loading) {
    return <CircularProgress />;
  }

  if (state.loggedin) {
    return <Redirect to="/" />;
  }

  return (
    <div className="Login">
      <div className={classes.wrapper}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <TextField className={classes.loginInput} name="username" label="Username" variant="outlined" value={state.username} onChange={changeHandler} /> 
          <br />
          <TextField className={classes.loginInput} name="password" label="Password" variant="outlined" value={state.password} onChange={changeHandler} type="password" />
          <br />
          <Button variant="contained" color="primary" type="submit">Login</Button>
        </form>
      </div>
      <Snackbar open={state.missing} autoHideDuration={3000} onClose={missingClose}>
        <Alert onClose={missingClose} severity="error">Please Provide a Username and Password</Alert>
      </Snackbar>
      <Snackbar open={state.invalid} autoHideDuration={3000} onClose={invalidClose}>
        <Alert onClose={invalidClose} severity="error">Invalid Credentials</Alert>
      </Snackbar>
    </div>
  );
}

export default Login;