import React from "react";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";


function HomeComponent() {



  return (
    <>
    <NavBar/>
    <div className="w-full h-screen bg-slate-950 flex justify-center">
        <div className="bg-slate-900 w-full mx-52">
            
        </div>
    </div>
      <Routes>
        <Route path="/home/perfil:id"/>
      </Routes>
    </>
  );
}

export default HomeComponent;
