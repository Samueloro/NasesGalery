import React, { useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginComponent from "./Pages/Auth/login/Login";
import HomeComponent from "./Pages/home/Home";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";


function App() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate()

  console.log(user);

  onAuthStateChanged(auth, (userF) => {
    if (userF) {
      setUser(userF);
      navigate("/home")
    } else {
      setUser(null);
      navigate("/")
    }
  });

  return (
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/home" element={<HomeComponent />} />
      </Routes>
  );
}

export default App;
