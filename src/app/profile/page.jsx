"use client";
import React, { useContext } from "react";
import { UserDataContext } from "../Contexts/UserDataProvider/UserDataProvider";
import DoctorsProfileEditor from "./ProfileComponents/DoctorsProfileEditor/DoctorsProfileEditor";
import GeneralProfileEditor from "./ProfileComponents/GeneralProfileEditor/GeneralProfileEditor";

// export const metadata={
//   title:'Profile - PHP Hospital'
// }
const page = () => {
  const { singleUser } = useContext(UserDataContext);
  const doctorCredentials ={
    email : singleUser?.email,
    id: singleUser?.id
  }
  return (
    <div>
      {singleUser?.userRole === "doctor" ? (
        <DoctorsProfileEditor doctorCredentials={doctorCredentials}/>
      ) : (
        <GeneralProfileEditor />
      )}
    </div>
  );
};

export default page;
