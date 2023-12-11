// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-8aaf0.firebaseapp.com",
  projectId: "real-estate-8aaf0",
  storageBucket: "real-estate-8aaf0.appspot.com",
  messagingSenderId: "763698314525",
  appId: "1:763698314525:web:0f1cdd190413502b4775f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);