// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnb71cLp5FNoEaPy65bVg7UdOob7iidA8",
  authDomain: "pantry-tracker-jeet.firebaseapp.com",
  projectId: "pantry-tracker-jeet",
  storageBucket: "pantry-tracker-jeet.appspot.com",
  messagingSenderId: "890128743179",
  appId: "1:890128743179:web:396548bc4a90f402e9400e",
  measurementId: "G-748DMNZG2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
