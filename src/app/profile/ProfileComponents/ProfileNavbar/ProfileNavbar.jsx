'use client'
import React, { useContext } from "react";
import ProfileInNavbar from "../ProfileInNavbar/ProfileInNavbar";
import RoutesInNavbar from "../RoutesInNavbar/RoutesInNavbar";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";

const ProfileNavbar = () => {
    const { singleUser } = useContext(UserDataContext);
  return (
    <div>
      <ProfileInNavbar singleUser={singleUser}/>
      <hr className="my-2 " />
      <RoutesInNavbar singleUser={singleUser}/>
    </div>
  );
};

export default ProfileNavbar;
