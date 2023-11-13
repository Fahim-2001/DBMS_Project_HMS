"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import Link from "next/link";
import React, { useContext } from "react";

const SideNavbar = () => {
  const { runningUser } = useContext(UserDataContext);
  // console.log(runningUser)
  return (
    <div>
      <nav className="flex flex-col">
        <Link
          className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
          href={"/dashboard/doctors"}
        >
          Doctors
        </Link>

        <Link
          className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
          href={"/dashboard/users"}
        >
          Users
        </Link>

        {(runningUser?.userRole === "super-admin" ||
          runningUser?.userRole === "admin") && (
          <Link
            className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
            href={"/dashboard/roles"}
          >
            Roles
          </Link>
        )}

        {(runningUser?.userRole === "doctor" ||
          runningUser?.userRole === "super-admin" ||
          runningUser?.userRole === "admin") && (
          <Link
            className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
            href={"/dashboard/appointments"}
          >
            Appointments
          </Link>
        )}

        {(runningUser?.userRole === "lab-attendant" ||
          runningUser?.userRole === "super-admin" ||
          runningUser?.userRole === "admin") && (
          <Link
            className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
            href={"/dashboard/vaccinerequests"}
          >
            Vaccine Requests
          </Link>
        )}

        {(runningUser?.userRole === "receptionist" ||
          runningUser?.userRole === "super-admin" ||
          runningUser?.userRole === "admin") && (
          <Link
            className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
            href={"/dashboard/labtestapplies"}
          >
            Lab Test Registration
          </Link>
        )}

        {runningUser?.userRole === "lab-attendant" && (
          <Link
            className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
            href={"/dashboard/labreports"}
          >
            Lab Reports
          </Link>
        )}
      </nav>
    </div>
  );
};

export default SideNavbar;
