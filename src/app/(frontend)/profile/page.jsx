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
  const { runningUser } = useContext(UserDataContext);
  const doctorCredentials ={
    email : runningUser?.email,
    id: runningUser?.id
  }
  // console.log(runningUser)
  const userId= runningUser?.id;
  return (
    <div>
      {runningUser?.userRole === "doctor" ? (
        <DoctorsProfileEditor doctorCredentials={doctorCredentials}/>
      ) : (
        <GeneralProfileEditor runningUser={runningUser} />
      )}
      <ResetPassword userId={userId}/>
    </div>
  );
};

export default page;
