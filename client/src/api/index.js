import axios from "axios";
import { getAuth } from "firebase/auth";
const API = axios.create({
  baseURL: "https://memories-backend-wqge.onrender.com/",
  // baseURL: 'http://localhost:5000/',
});

// for attaching headers
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    let token =
      JSON.parse(localStorage.getItem("profile")).token ||
      JSON.parse(localStorage.getItem("profile")).accessToken;

    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});

export const createPost = (newPost) => API.post("/posts", newPost);
export const fetchPosts = (page) => API.get(`/posts/?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const updatePost = (postId, updatedPost) =>
  API.patch(`/posts/${postId}`, updatedPost);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);
export const likePost = (postId) => API.patch(`/posts/like/${postId}`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, {
    value,
  });

// auth
export const signIn = (formData) =>
  API.post("/user/signin", {
    formData,
  });

export const signUp = (formData) =>
  API.post("/user/signup", {
    formData,
  });
