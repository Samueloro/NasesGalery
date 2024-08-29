
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

export const firebaseConfig = {
  apiKey: "AIzaSyBWIaSGjfLsGMJFFffe1cewWieHPhPGkiQ",
  authDomain: "nases-galery.firebaseapp.com",
  projectId: "nases-galery",
  storageBucket: "nases-galery.appspot.com",
  messagingSenderId: "190064264590",
  appId: "1:190064264590:web:7d81b6a80086a3638b10df",
  measurementId: "G-GS2K849K82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth}