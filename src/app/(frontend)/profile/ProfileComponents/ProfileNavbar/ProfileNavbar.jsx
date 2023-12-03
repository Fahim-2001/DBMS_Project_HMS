'use client'
import React, { useContext } from "react";
import ProfileInNavbar from "../ProfileInNavbar/ProfileInNavbar";
import RoutesInNavbar from "../RoutesInNavbar/RoutesInNavbar";
import { UserDataContext } from "@/app/(frontend)/Contexts/UserDataProvider/UserDataProvider";

const ProfileNavbar = () => {
    const { runningUser } = useContext(UserDataContext);
  return (
    <div>
      <ProfileInNavbar runningUser={runningUser}/>
      <hr className="my-2 " />
      <RoutesInNavbar runningUser={runningUser}/>
    </div>
  );
};

export default ProfileNavbar;
