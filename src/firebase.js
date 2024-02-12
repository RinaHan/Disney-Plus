// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWfR3Kib1rNybqh0BHmuz8jgOTR_s8Ksk",
  authDomain: "react-disney-plus-app-b1727.firebaseapp.com",
  projectId: "react-disney-plus-app-b1727",
  storageBucket: "react-disney-plus-app-b1727.appspot.com",
  messagingSenderId: "746478461835",
  appId: "1:746478461835:web:6fa53543c1325cb7c8858e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;