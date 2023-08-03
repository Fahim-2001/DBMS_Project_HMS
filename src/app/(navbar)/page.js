import Link from "next/link";
import React from "react";

export default function Navbar() {
  const menuItems = (
    <>
      <li tabIndex={0}>
        <details>
          <summary className="bg-white hover:bg-base-100 px-3 py-2 mx-2 hover:shadow-xl">
            Departments
          </summary>
          <ul className="p-2">
            <li>
              <Link
                href=""
                className="bg-white hover:bg-base-100 px-3 py-2 mx-2"
              >
                Submenu 1
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="bg-white hover:bg-base-100 px-3 py-2 mx-2"
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
          className="bg-white hover:bg-base-100 px-3 py-2 mx-2 hover:shadow-xl"
        >
          Disease Information
        </Link>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className="bg-white hover:bg-base-100 px-3 py-2 mx-2 hover:shadow-xl">
            Patient Care
          </summary>
          <ul className="p-2">
            <li>
              <Link
                href=""
                className="bg-white hover:bg-base-100 px-3 py-2 mx-2"
              >
                Submenu 1
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="bg-white hover:bg-base-100 px-3 py-2 mx-2"
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
          className="bg-white hover:bg-base-100 px-3 py-2 mx-2 hover:shadow-xl"
        >
          Vaccination Program
        </Link>
      </li>
      <li>
        <Link
          href=""
          className="bg-white hover:bg-base-100 px-3 py-2 mx-2 hover:shadow-xl"
        >
          Apply for insurance
        </Link>
      </li>
      <li>
        <Link
          href=""
          className="bg-white hover:bg-base-100 px-3 py-2 mx-2 hover:shadow-xl"
        >
          Our Exillencies
        </Link>
      </li>
      <li>
        <Link
          href=""
          className="bg-white hover:bg-base-100 px-3 py-2 mx-2 hover:shadow-xl"
        >
          Contact Us
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-primary shadow-md">
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
        <Link href="" className="bg-primary normal-case text-xl px-4">
          PHP
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        <Link href={""} className="btn-primary px-3 py-2 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
