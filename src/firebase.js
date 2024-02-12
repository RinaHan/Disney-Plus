// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEOajOXUzeIuE9hDXehHxI0E8fwvhEEwQ",
  authDomain: "disney-project-ca1f1.firebaseapp.com",
  projectId: "disney-project-ca1f1",
  storageBucket: "disney-project-ca1f1.appspot.com",
  messagingSenderId: "507098202386",
  appId: "1:507098202386:web:40f64068f300414053b3cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;