import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: "AIzaSyAl3ViCCSime2BGiyDLFrb0NIPgpn5W16c",
//   authDomain: "crudproject-49082.firebaseapp.com",
//   databaseURL: "https://crudproject-49082-default-rtdb.firebaseio.com",
//   projectId: "crudproject-49082",
//   storageBucket: "crudproject-49082.appspot.com",
//   messagingSenderId: "928599977094",
//   appId: "1:928599977094:web:623d8c0cfcb15612e07507"
// };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1DM9BJ5Z8AeQMMbnIJVpvgXm4AcvG6T8",
  authDomain: "react2024-c2c57.firebaseapp.com",
  databaseURL: "https://react2024-c2c57-default-rtdb.firebaseio.com/",
  projectId: "react2024-c2c57",
  storageBucket: "react2024-c2c57.appspot.com",
  messagingSenderId: "566779267441",
  appId: "1:566779267441:web:f2fc3d4ca2192d90eeced0",
  measurementId: "G-WYCYPHGYZV"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
