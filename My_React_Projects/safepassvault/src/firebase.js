import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIMRMTVynf_WSF4kVHQ-dWP7koBo-EDaI",
  authDomain: "safepassvault-f87da.firebaseapp.com",
  databaseURL: "https://safepassvault-f87da-default-rtdb.firebaseio.com/",
  projectId: "safepassvault-f87da",
  storageBucket: "safepassvault-f87da.appspot.com",
  messagingSenderId: "1026604914661",
  appId: "1:1026604914661:web:8fb18d33f6a8d53825810c",
  measurementId: "G-2031FCWEY9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);