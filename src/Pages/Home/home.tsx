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
      <div className="w-full h-fit bg-Charcoal flex justify-center">
        <div className=" w-full mx-52">
          <Routes>
            <Route path="/" element={ <CardsPosts />}/>
            <Route path="profile/:name" element={<Profile userName={userName}/>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
