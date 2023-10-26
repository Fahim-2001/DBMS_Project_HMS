"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import Link from "next/link";
import React, { useContext } from "react";

const SideNavbar = () => {
  const { singleUser } = useContext(UserDataContext);
  // console.log(singleUser)
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
        {(singleUser?.userRole === "super-admin" ||
          singleUser?.userRole === "admin") && (
            <Link
              className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
              href={"/dashboard/roles"}
            >
              Roles
            </Link>
          )}
          {(singleUser?.userRole==='doctor' || singleUser?.userRole==='super-admin')&&<Link
            className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
            href={'/dashboard/appointments'}
          >
            Appointments
          </Link>}
          <Link
            className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
            href={'/dashboard/vaccinerequests'}
          >
            Vaccine Requests
          </Link>
          <Link
            className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
            href={'/dashboard/labtestapplies'}
          >
            Lab Test Registration
          </Link>
          <Link
            className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
            href={'/dashboard/labreports'}
          >
            Lab Reports
          </Link>
      </nav>
    </div>
  );
};

export default SideNavbar;
