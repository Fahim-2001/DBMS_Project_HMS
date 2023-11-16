import Link from "next/link";
import React from "react";

const RoutesInNavbar = ({ runningUser }) => {
  //   console.log(runningUser);
  const navLinks = (
    <>
      <li className="text-sm md:hover:bg-gray-300  py-1 md:py-2">
        {runningUser?.userRole === "doctor" ? (
          <Link
            className="px-3"
            href={"/profile/doctorsappointments"}
          >
            Your Appointments
          </Link>
        ) : (
          <Link
            className="px-3"
            href={"/profile/yourappointments"}
          >
            Your Booked Appointments
          </Link>
        )}
      </li>
      <li className="text-sm md:hover:bg-gray-300 py-1 md:py-2">
        {runningUser?.userRole !== "doctor" && (
          <Link
            className="px-3"
            href={"/profile/labreports"}
          >
            Your Lab Reports
          </Link>
        )}
      </li>
    </>
  );
  return (
    <div>
      <div className="dropdown dropdown-hover md:hidden flex justify-end mr-3">
        <label tabIndex={0} className="btn-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu bg-base-100 shadow-md rounded-box w-64 mt-5"
        >
          {navLinks}
        </ul>
      </div>
      {/* For Tab and PC */}
      <ul className="flex md:flex-col overflow-x-auto hidden md:block">
        {navLinks}
      </ul>
    </div>
  );
};

export default RoutesInNavbar;
