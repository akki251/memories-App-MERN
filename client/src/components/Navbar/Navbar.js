import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Button } from '@material-ui/core';
import memories from '../../images/memories.png';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import useStyles from './NavbarStyles.js';
import { Toolbar } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const classes = useStyles();

  const [showError, setShowError] = useState(false);

  const history = useHistory();

  let errorMessage = useSelector((state) => state.error);

  const notify = () => {
    toast.error(errorMessage.message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // toast(errorMessage.message);
  };

  useEffect(() => {
    if (errorMessage.message.length) {
      setShowError(true);
      notify();
    }
  }, [errorMessage]);

  const dispatch = useDispatch();
  const location = useLocation();

  const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('profile')));

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    setAuthData(null);
    history.push('/auth');
  };

  // const user = null;

  useEffect(() => {
    const token = authData?.token || authData?.accessToken;

    if (token) {
      const decodedToken = decode(token);
      console.log(decodedToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logoutHandler();
      }
    }

    setAuthData(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  // console.log(authData);

  return (
    <>
      {showError && (
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      )}
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
          <img src={memoriesText} alt="icon" height="45px" />
          <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
        </Link>
        <Toolbar className={classes.toolbar}>
          {authData?.user || authData?.name ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={authData?.user?.displayName || authData?.name}
                src={authData?.user?.photoURL}
              >
                {authData?.user?.displayName.charAt(0) || authData?.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {authData?.user?.displayName || authData?.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="contained" color="primary" component={Link} to="/auth">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
