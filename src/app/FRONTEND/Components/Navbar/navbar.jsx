"use client";

import { UserDataContext } from "@/app/FRONTEND/Contexts/UserDataProvider/UserDataProvider";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";

export default function Navbar() {
  const session = useSession();
  // console.log(session?.data?.user);
  const { runningUser } = useContext(UserDataContext);
  // console.log(runningUser);

  const menuItems = (
    <>
      <li>
        <Link
          href="/patient-documents"
          className="md:bg-white text-black hover:bg-gray-300 px-3 py-2 my-1 mx-2 shadow-none md:shadow-md md:hover:shadow-xl"
        >
          Find Your Things
        </Link>
      </li>
      <li>
        <Link
          href="/vaccination"
          className="md:bg-white text-black hover:bg-gray-300 px-3 py-2 my-1 mx-2 shadow-none md:shadow-md md:hover:shadow-xl"
        >
          Vaccination Program
        </Link>
      </li>
      <li>
        <Link
          href=""
          className="md:bg-white text-black hover:bg-gray-300 px-3 py-2 my-1 mx-2 shadow-none md:shadow-md md:hover:shadow-xl"
        >
          Our Exillencies
        </Link>
      </li>
      <li>
        <Link
          href=""
          className="md:bg-white text-black hover:bg-gray-300 px-3 py-2 my-1 mx-2 shadow-none md:shadow-md md:hover:shadow-xl"
        >
          Contact Us
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-primary shadow-md sticky top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown mx-2">
          <label tabIndex={0} className="btn-white lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link href="/" className="bg-primary text-white normal-case px-4">
          <p className="text-2xl font-bold italic">
            PHP <span className="text-xs">Hospital</span>
          </p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end mr-2" title="User Profile">
        {session?.data?.user ? (
          <>
            {
              <div>
                <p className="mx-2 text-md font-semibold font-serif text-white ">
                  {runningUser?.fullname || session?.data?.user?.name}
                </p>
                {runningUser?.userRole !== "user" && (
                  <p className="text-white text-xs text-right">
                    {runningUser?.userRole}
                  </p>
                )}
              </div>
            }

            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                  {runningUser?.picture ? (
                    <img src={runningUser?.picture} alt="Picture of user" />
                  ) : (
                    <img
                      src={
                        runningUser?.gender == "male"
                          ? "https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
                          : "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg"
                      }
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {(runningUser?.userRole === "super-admin" ||
                  runningUser?.userRole === "admin" ||
                  runningUser?.userRole === "receptionist" ||
                  runningUser?.userRole === "lab-attendant" ||
                  runningUser?.userRole === "doctor") && (
                  <li>
                    <Link href={"/dashboard"}>Dashboard</Link>
                  </li>
                )}
                <li>
                  <Link href={"/profile"}>Profile</Link>
                </li>
                <li onClick={() => signOut()}>
                  <p> {"[->"} Sign Out </p>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link
            href={"/signin"}
            className="btn-primary px-2 py-2 rounded-[50%] bg-white hover:bg-gray-200"
            title="Log In"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
