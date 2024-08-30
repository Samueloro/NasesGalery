import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'
import {getFirestore} from "firebase/firestore"

export const firebaseConfig = {
  apiKey: "AIzaSyBWIaSGjfLsGMJFFffe1cewWieHPhPGkiQ",
  authDomain: "nases-galery.firebaseapp.com",
  projectId: "nases-galery",
  storageBucket: "nases-galery.appspot.com",
  messagingSenderId: "190064264590",
  appId: "1:190064264590:web:7d81b6a80086a3638b10df",
  measurementId: "G-GS2K849K82",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);


const auth = getAuth(appFirebase);
const storage = getStorage(appFirebase);
const firestore = getFirestore(appFirebase)

export const uploadfile = (file: File) => {
  const storageRef = ref(storage, uuidv4());
  uploadBytes(storageRef, file).then((snapshot) => {
    alert('Imagen subida')
  });
};

export { appFirebase, auth, storage, firestore };
