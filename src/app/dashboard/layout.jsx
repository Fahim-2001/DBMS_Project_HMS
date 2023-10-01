import Link from "next/link";
import React from "react";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import SideNavbar from "./DashboardComponents/SideNavbar/SideNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <section className="grid grid-cols-[20%_minmax(80%,_1fr)] mx-3 max-h-screen">
        <SideNavbar/>
        <main className="py-2 my-1">{children}</main>
      </section>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
