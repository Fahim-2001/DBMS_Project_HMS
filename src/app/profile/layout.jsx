import React from "react";
import ProfileNavbar from "./ProfileComponents/ProfileNavbar/ProfileNavbar";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";

const ProfileLayout = ({ children }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[25%_minmax(75%,_1fr)] mx-3 max-h-screen">
      <div className="border border-x-0 border-y-0 md:border-e">
        <ProfileNavbar />
      </div>
      <main className="md:ml-5 my-2">{children}</main>
    </section>
  );
};

export default ProfileLayout;
