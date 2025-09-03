// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNACPQfLuAkengMXKn8bigVePKdLx2DnA",
  authDomain: "bricks-dcf39.firebaseapp.com",
  projectId: "bricks-dcf39",
  storageBucket: "bricks-dcf39.firebasestorage.app",
  messagingSenderId: "306111848142",
  appId: "1:306111848142:web:d0725413a46114bdd6fa9f",
  measurementId: "G-Z08GL92KLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);