import React, { Suspense } from "react";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import SideNavbar from "./DashboardComponents/SideNavbar/SideNavbar";
import Loading from "../Components/Loading/Loading";

export const metadata={
  title: "Dashboard - PHP Hospital"
}
const DashboardLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <section className="grid grid-cols-[20%_minmax(80%,_1fr)] mx-3 max-h-screen">
        <SideNavbar />
        <Suspense fallback={<Loading/>}>
          <main className="mx-3 py-2 my-1">{children}</main>
        </Suspense>
      </section>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
