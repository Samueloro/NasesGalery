import React from "react";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import CardsPosts from "./CardPosts/Cards";

interface HomeComponentProps {
  userName: string | undefined;
  userId: string | undefined;
}

function HomeComponent({ userName, userId }: Readonly<HomeComponentProps>) {
  return (
    <>
      <NavBar userName={userName} userId={userId} />
      <div className="w-full h-screen bg-slate-950 flex justify-center">
        <div className="bg-slate-900 w-full mx-52">
            <CardsPosts />
          <Routes>
            <Route path="profile/:id" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
