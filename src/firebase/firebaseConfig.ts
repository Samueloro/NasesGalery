import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCb2UKAOK5NlCmJHnudWWTm3ff2sOmYTmQ",
  authDomain: "galer-ca582.firebaseapp.com",
  projectId: "galer-ca582",
  storageBucket: "galer-ca582.appspot.com",
  messagingSenderId: "875528204145",
  appId: "1:875528204145:web:09304637faf7c90a7b10d0",
  measurementId: "G-2BWWBLRH6B"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

const auth = getAuth(appFirebase);
const storage = getStorage(appFirebase);
const firestore = getFirestore(appFirebase);

export { appFirebase, auth, storage, firestore };
