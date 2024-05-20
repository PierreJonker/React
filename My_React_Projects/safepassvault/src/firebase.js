import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDUV2sDKQ7hbZgfFfiHw1NZQLcyIKm7iuw",
  authDomain: "safepassvault-e5d29.firebaseapp.com",
  projectId: "safepassvault-e5d29",
  storageBucket: "safepassvault-e5d29.appspot.com",
  messagingSenderId: "820250180754",
  appId: "1:820250180754:web:3efbfd761f350cc953ba4b",
  measurementId: "G-F9D4R3HB94"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, collection, addDoc };