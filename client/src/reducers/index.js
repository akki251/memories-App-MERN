import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import error from './error';
export const reducers = combineReducers({ posts, auth, error });
