"use client";

import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";

export default function Navbar() {
  const session = useSession();
  // console.log(session?.data?.user);
  const userData = useContext(UserDataContext);
  // console.log(userData);
  
  const menuItems = (
    <>
      <li>
        <Link
          href=""
          className="bg-white text-black hover:bg-base-100 px-3 py-2 my-1 mx-2 shadow-md hover:shadow-xl"
        >
          Disease Information
        </Link>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className="bg-white text-black hover:bg-base-100 px-3 py-2 my-1 mx-2 shadow-md hover:shadow-xl">
            Patient Care
          </summary>
          <ul className="p-2">
            <li>
              <Link
                href=""
                className="bg-white text-black hover:bg-base-100 px-3 py-2 my-1 mx-2"
              >
                Submenu 1
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="bg-white text-black hover:bg-base-100 px-3 py-2 my-1 mx-2"
              >
                Submenu 2
              </Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link
          href=""
          className="bg-white text-black hover:bg-base-100 px-3 py-2 my-1 mx-2 shadow-md hover:shadow-xl"
        >
          Vaccination Program
        </Link>
      </li>
      <li>
        <Link
          href=""
          className="bg-white text-black hover:bg-base-100 px-3 py-2 my-1 mx-2 shadow-md hover:shadow-xl"
        >
          Apply for insurance
        </Link>
      </li>
      <li>
        <Link
          href=""
          className="bg-white text-black hover:bg-base-100 px-3 py-2 my-1 mx-2 shadow-md hover:shadow-xl"
        >
          Our Exillencies
        </Link>
      </li>
      <li>
        <Link
          href=""
          className="bg-white text-black hover:bg-base-100 px-3 py-2 my-1 mx-2 shadow-md hover:shadow-xl"
        >
          Contact Us
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-primary shadow-md sticky top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
              <p className="mx-2 text-md font-semibold font-serif text-white ">
                {userData.fullname}
              </p>
            }
            <details className="dropdown dropdown-end">
              <summary className="avatar">
                <div className="w-9 mt-2 rounded-full">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                    alt=""
                  />
                </div>
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 mr-3">
                {userData?.userRole === "super-admin" && (<li>
                  <Link href={"/dashboard"}>Dashboard</Link>
                </li>)}
                <li>
                  <Link href={"/"}>Profile</Link>
                </li>
                <li onClick={() => signOut()}>
                  <p> {"[->"} Sign Out </p>
                </li>
              </ul>
            </details>
          </>
        ) : (
          <Link
            href={"/signin"}
            className="btn-primary px-2 py-2 rounded-md bg-white hover:bg-base-100"
            title="Log In"
          >
            <p>{"->]"}</p>
          </Link>
        )}
      </div>
    </div>
  );
}
