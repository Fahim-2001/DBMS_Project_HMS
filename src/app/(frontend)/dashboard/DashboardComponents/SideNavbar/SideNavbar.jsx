"use client";
import { UserDataContext } from "@/app/(frontend)/Contexts/UserDataProvider/UserDataProvider";
import Link from "next/link";
import React, { useContext } from "react";

const SideNavbar = () => {
  const { runningUser } = useContext(UserDataContext);
  // console.log(runningUser)
  const navLinks = (
    <>
      <Link
        className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
        href={"/dashboard/doctors"}
      >
        Doctors
      </Link>

      <Link
        className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
        href={"/dashboard/users"}
      >
        Users
      </Link>

      {(runningUser?.userRole === "super-admin" ||
        runningUser?.userRole === "admin") && (
        <Link
          className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
          href={"/dashboard/roles"}
        >
          Roles
        </Link>
      )}

      {(runningUser?.userRole === "doctor" ||
        runningUser?.userRole === "super-admin" ||
        runningUser?.userRole === "admin") && (
        <Link
          className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
          href={"/dashboard/appointments"}
        >
          Appointments
        </Link>
      )}

      {(runningUser?.userRole === "lab-attendant" ||
        runningUser?.userRole === "super-admin" ||
        runningUser?.userRole === "admin") && (
        <Link
          className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
          href={"/dashboard/vaccinerequests"}
        >
          Vaccine Requests
        </Link>
      )}

      {(runningUser?.userRole === "receptionist" ||
        runningUser?.userRole === "super-admin" ||
        runningUser?.userRole === "admin") && (
        <Link
          className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
          href={"/dashboard/labtestapplies"}
        >
          Lab Test Registration
        </Link>
      )}

      {runningUser?.userRole === "lab-attendant" && (
        <Link
          className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
          href={"/dashboard/labreports"}
        >
          Lab Reports
        </Link>
      )}
    </>
  );
  return (
    <div>
      <nav className="font-medium">
        <div className="flex overflow-x-auto md:flex-col">{navLinks}</div>  
      </nav>
    </div>
  );
};

export default SideNavbar;
