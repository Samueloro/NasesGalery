import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginComponent from "./Pages/Auth/login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "./firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import HomeComponent from "./Pages/home/Home";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>();
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userF) => {
      const userRef = doc(firestore, `users/${userF?.uid}`);
      const userDoc = await getDoc(userRef);

      if (userF) {
        if (userDoc) {
          const userData = userDoc.data();
          setUserName(userData?.userName || "Unknown");
        } else {
          console.log("No se encontró el documento");
        }
        setUserId(userF.uid);
        navigate("/home");
      } else {
        navigate("/");
      }
      setIsLoading(false);
    });
    //limpiar la subscripción
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center">Cargando...</div>
      )}
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route
          path="/home/*"
          element={<HomeComponent userName={userName} userId={userId} />}
        />
      </Routes>
    </>
  );
}

export default App;
