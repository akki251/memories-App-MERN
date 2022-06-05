import { AUTH, LOGOUT } from '../actions/constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
      break;
    case LOGOUT:
      localStorage.removeItem('profile');
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
