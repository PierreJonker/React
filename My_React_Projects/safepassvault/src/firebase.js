import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-cse-vnuNr14ivrhEapESB2s4BL_FkZI",
  authDomain: "safepassvault.firebaseapp.com",
  projectId: "safepassvault",
  storageBucket: "safepassvault.appspot.com",
  messagingSenderId: "312079692617",
  appId: "1:312079692617:web:84cb6bfe68cf5d4b1b6098",
  measurementId: "G-RVEE92B3DT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);