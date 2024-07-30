import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBnb71cLp5FNoEaPy65bVg7UdOob7iidA8",
  authDomain: "pantry-tracker-jeet.firebaseapp.com",
  projectId: "pantry-tracker-jeet",
  storageBucket: "pantry-tracker-jeet.appspot.com",
  messagingSenderId: "890128743179",
  appId: "1:890128743179:web:396548bc4a90f402e9400e",
  measurementId: "G-748DMNZG2N"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const db = getFirestore();
export const auth = getAuth();

let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes ? analytics = getAnalytics() : null);
}

export { analytics };
