import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeComponent from "./Pages/Home/home";
import LoginComponent from "./Pages/Auth/login/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/home" element={<HomeComponent />} />
      <Route path="/profile:id" element={<HomeComponent />} />
    </Routes>
  );
}

export default App;
