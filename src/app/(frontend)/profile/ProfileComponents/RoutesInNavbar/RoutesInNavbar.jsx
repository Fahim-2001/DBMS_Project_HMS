import Link from "next/link";
import React from "react";

const RoutesInNavbar = ({ runningUser }) => {
  //   console.log(runningUser);
  const navLinks = (
    <>
      <li className="text-sm md:hover:bg-gray-300  py-1 md:py-2">
        {runningUser?.userRole === "doctor" ? (
          <Link
            className="px-3 flex items-center"
            href={"/profile/doctorsappointments"}
          >
            <svg
              fill="#000000"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              data-name="Layer 1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title></title>
                <path d="M18,5V3a1,1,0,0,0-2,0V5H8V3A1,1,0,0,0,6,3V5H2V21H22V5Zm2,14H4V7H20Zm-7-9H11v2h2Zm4,0H15v2h2ZM9,14H7v2H9Zm4,0H11v2h2Z"></path>
              </g>
            </svg>
            <span className="ml-2">Your Appointments</span>
          </Link>
        ) : (
          <Link
            className="px-3 flex items-center"
            href={"/profile/yourappointments"}
          >
            <svg
              fill="#000000"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              data-name="Layer 1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title></title>
                <path d="M18,5V3a1,1,0,0,0-2,0V5H8V3A1,1,0,0,0,6,3V5H2V21H22V5Zm2,14H4V7H20Zm-7-9H11v2h2Zm4,0H15v2h2ZM9,14H7v2H9Zm4,0H11v2h2Z"></path>
              </g>
            </svg>
            <span className="ml-2">Your Booked Appointments</span>
          </Link>
        )}
      </li>
      <li className="text-sm md:hover:bg-gray-300 py-1 md:py-2">
        {runningUser?.userRole !== "doctor" && (
          <Link className="px-3 flex items-center" href={"/profile/labreports"}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios/50/health-graph.png"
              alt="health-graph"
            />
            <span className="ml-2">Your Lab Reports</span>
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
