// import { AUTH, LOGOUT } from '../actions/constants/actionTypes';

const errorReducer = (state = { message: '', id: '' }, action) => {
  switch (action.type) {
    case 'ERROR':
      return { ...state, message: action.errorMessage };

    default:
      return state;
  }
};

export default errorReducer;
