import * as api from '../api/index.js';

import {
  CREATE,
  UPDATE,
  FETCH_ALL,
  DELETE,
  LIKE_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from './constants/actionTypes';

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    // alert(data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPost(id);

    console.log(data);
    // alert(data);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const {
      data: { data },
    } = await api.createPost(post);
    history.push(`/posts/${data._id}`);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (postId, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(postId, updatedPost);

    console.log(data.data);

    dispatch({ type: UPDATE, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const { status } = await api.deletePost(postId);
    // console.log(status);
    dispatch({ type: DELETE, payload: postId });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    const { status, data: res } = await api.likePost(postId);
    // console.log(status);

    const post = res.updatedPost;
    // console.log(post);
    dispatch({ type: LIKE_POST, payload: post });
  } catch (error) {
    console.log(error.message);
  }
};
