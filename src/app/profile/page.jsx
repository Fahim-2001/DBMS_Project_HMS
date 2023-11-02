"use client";
import React, { useContext } from "react";
import { UserDataContext } from "../Contexts/UserDataProvider/UserDataProvider";
import DoctorsProfileEditor from "./ProfileComponents/DoctorsProfileEditor/DoctorsProfileEditor";
import GeneralProfileEditor from "./ProfileComponents/GeneralProfileEditor/GeneralProfileEditor";
import ResetPassword from "./ProfileComponents/ResetPassword/ResetPassword";

// export const metadata={
//   title:'Profile - PHP Hospital'
// }
const page = () => {
  const { singleUser } = useContext(UserDataContext);
  const doctorCredentials ={
    email : singleUser?.email,
    id: singleUser?.id
  }

  const userId= singleUser?.id;
  return (
    <div>
      {singleUser?.userRole === "doctor" ? (
        <DoctorsProfileEditor doctorCredentials={doctorCredentials}/>
      ) : (
        <GeneralProfileEditor />
      )}
      <ResetPassword userId={userId}/>
    </div>
  );
};

export default page;
