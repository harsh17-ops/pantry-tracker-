import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnb71cLp5FNoEaPy65bVg7UdOob7iidA8",
  authDomain: "pantry-tracker-jeet.firebaseapp.com",
  projectId: "pantry-tracker-jeet",
  storageBucket: "pantry-tracker-jeet.appspot.com",
  messagingSenderId: "890128743179",
  appId: "1:890128743179:web:396548bc4a90f402e9400e",
  measurementId: "G-748DMNZG2N"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
