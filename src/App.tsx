import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginComponent from "./Pages/Auth/login/Login";
import HomeComponent from "./Pages/home/Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userF) => {
      if (userF) {
        navigate("/home");
      } else {
        navigate("/");
      }
      setIsLoading(false);
    });
    //limpiar la subscripción
    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      {isLoading && <div className="flex justify-center items-center">Cargando...</div>}
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/home" element={<HomeComponent />} />
      </Routes>
    </>
  );
}

export default App;
