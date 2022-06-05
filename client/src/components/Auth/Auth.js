import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './AuthStyles';
import '../../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Icon from './icon';
import { LockOutlinedIcon } from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { signin, signup } from '../../actions/auth';
import { useHistory } from 'react-router';
//  these are required for google auth
const provider = new GoogleAuthProvider();
const auth = getAuth();

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // states
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  // handler functions
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // alert('signup');
      dispatch(signup(formData, history));
      //  signup
    } else {
      //  login
      dispatch(signin(formData, history));
    }
  };

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // console.log(accessToken);
        const accessToken = user.stsTokenManager.accessToken;
        dispatch({ type: 'AUTH', data: { user, accessToken } });
        history.push('/');
        // console.log(user);
      })
      .catch((error) => {
        alert('google error');
      });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    setShowPassword(false);
  };

  const handleChangeHandler = (e) => {
    ///  imp
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const handleChange = () => {};

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography variant="h5"> {isSignUp ? 'Sign Up' : 'Sign In'} </Typography>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChangeHandler}
                    half
                  />
                  <Input name="lastName" label="LastName" handleChange={handleChangeHandler} half />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChangeHandler}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChangeHandler}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChangeHandler}
                  type="password"
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                className={classes.submit}
              >
                {isSignUp ? 'Sign up' : 'Sign In'}
              </Button>
              <Button
                className={classes.googleButton}
                onClick={handleLogin}
                variant="contained"
                color="primary"
                fullWidth
              >
                {' '}
                Sign in with google
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button onClick={switchMode}>
                    {isSignUp
                      ? 'Already have an account ? SignIn'
                      : "Don't have an account ? Sign UP"}{' '}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Auth;
