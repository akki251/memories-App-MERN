import * as api from '../api/index.js';

import { AUTH } from './constants/actionTypes';

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data: res } = await api.signIn(formData);

    const token = res.data.token;

    const data = { ...res.data.user, token };
    // console.log(data);
    dispatch({ type: AUTH, data });
    history.push('/');
  } catch (error) {
    const errorMessage = error.response.data.message;
    dispatch({ type: 'ERROR', errorMessage });
    // console.log('sign in error');
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data: res } = await api.signUp(formData);

    const token = res.data.token;

    const data = { ...res.data.newUser, token };
    // console.log(data);
    dispatch({ type: AUTH, data });
    history.push('/');
  } catch (error) {
    console.log('sign up error');
  }
};
