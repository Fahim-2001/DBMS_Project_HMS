"use client";
import React, { useContext } from "react";
import { UserDataContext } from "../Contexts/UserDataProvider/UserDataProvider";
import DoctorsProfileEditor from "./ProfileComponents/DoctorsProfileEditor/DoctorsProfileEditor";

// export const metadata={
//   title:'Profile - PHP Hospital'
// }
const page = () => {
  const { singleUser } = useContext(UserDataContext);
  return (
    <div>{singleUser?.userRole === "doctor" && <DoctorsProfileEditor />}</div>
  );
};

export default page;
