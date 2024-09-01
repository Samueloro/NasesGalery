import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCLRFm2Vad9x9yW1R0RCKhoiAwaj7y_Os0",
  authDomain: "nases-galery-8d5b4.firebaseapp.com",
  projectId: "nases-galery-8d5b4",
  storageBucket: "nases-galery-8d5b4.appspot.com",
  messagingSenderId: "41210823802",
  appId: "1:41210823802:web:fa78025101e2c505c727c3",
  measurementId: "G-VRJZPPZGZ5"
};

// inicio de firebase y servicios
const appFirebase = initializeApp(firebaseConfig);

const auth = getAuth(appFirebase);
const storage = getStorage(appFirebase);
const firestore = getFirestore(appFirebase);

export { appFirebase, auth, storage, firestore };
