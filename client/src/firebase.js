// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_CLIENT_API_KEY,
  authDomain: 'mern-memories-6b9fa.firebaseapp.com',
  projectId: 'mern-memories-6b9fa',
  storageBucket: 'mern-memories-6b9fa.appspot.com',
  messagingSenderId: '151710118960',
  appId: '1:151710118960:web:b7be91972b29c609e1a9f5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
