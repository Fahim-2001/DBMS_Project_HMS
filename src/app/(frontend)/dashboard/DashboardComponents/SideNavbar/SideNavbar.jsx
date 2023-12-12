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
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M24 25.1333C28.9725 25.1333 33 21.076 33 16.0667C33 11.0573 28.9725 7 24 7C19.0275 7 15 11.0573 15 16.0667C15 21.076 19.0275 25.1333 24 25.1333Z"
              fill="#000000"
            ></path>
            <mask
              id="mask0"
              maskType="alpha"
              maskUnits="userSpaceOnUse"
              x="6"
              y="28"
              width="36"
              height="13"
            >
              <path
                d="M16.8786 28.3569C17.3814 28.2333 17.8971 28.4861 18.1254 28.9539L22.1893 28.9542C24 28.9538 24 28.9543 25.8105 28.9539L29.8746 28.9539C30.1029 28.4861 30.6186 28.2333 31.1214 28.3569C36.5255 29.6849 42 32.3928 42 36.4664V40.9997H6V36.4664C6 32.3928 11.4745 29.6849 16.8786 28.3569Z"
                fill="#000000"
              ></path>
            </mask>
            <g mask="url(#mask0)"> </g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.6354 29.9375C15.4505 30.5613 15.4381 31.3074 15.7149 32.1985C15.8088 32.1896 15.9039 32.1851 16 32.1851C17.6569 32.1851 19 33.5382 19 35.2073C19 36.8764 17.6569 38.2295 16 38.2295C14.3431 38.2295 13 36.8764 13 35.2073C13 34.3657 13.3415 33.6044 13.8925 33.0564C13.4321 31.7408 13.3829 30.4996 13.7178 29.3692C13.7252 29.3442 13.7328 29.3193 13.7406 29.2945C9.54212 30.7966 6 33.1897 6 36.4664V42.9997H42V36.4664C42 33.2191 38.5212 30.8396 34.3723 29.3352C34.5763 29.9155 34.6923 30.5333 34.7142 31.1851H34.9412C35.1715 31.1851 35.3947 31.2645 35.5732 31.4101L37.632 33.0891C37.8649 33.279 38 33.5636 38 33.8641V38.2295C38 38.7818 37.5523 39.2295 37 39.2295H34.9412V37.2295H36V34.3389L34.5851 33.1851H34.5045C34.4953 33.2244 34.4858 33.2639 34.476 33.3035L33.9986 33.1851H32.4149L31 34.3389V37.2295H32.0588V39.2295H30C29.4477 39.2295 29 38.7818 29 38.2295V33.8641C29 33.5636 29.1351 33.279 29.368 33.0891L31.4268 31.4101C31.6053 31.2645 31.8285 31.1851 32.0588 31.1851H32.7126C32.6878 30.6727 32.5803 30.2144 32.4114 29.8041C32.2091 29.3129 31.9073 28.8627 31.5142 28.4558C31.3833 28.422 31.2523 28.389 31.1214 28.3569C30.6186 28.2333 30.1029 28.4861 29.8746 28.9539L25.8105 28.9539C24.9218 28.9541 24.4694 28.9541 24.0249 28.954H24.0248H24.0248C23.5637 28.954 23.1112 28.954 22.1893 28.9542L18.1254 28.9539C17.8971 28.4861 17.3814 28.2333 16.8786 28.3569C16.7666 28.3844 16.6544 28.4125 16.5424 28.4413C16.0993 28.8976 15.7951 29.3987 15.6354 29.9375ZM17 35.2073C17 35.7858 16.5384 36.2295 16 36.2295C15.4616 36.2295 15 35.7858 15 35.2073C15 34.6288 15.4616 34.1851 16 34.1851C16.5384 34.1851 17 34.6288 17 35.2073Z"
              fill="#000000"
            ></path>
          </g>
        </svg>
        <p className="ml-2">Doctors</p>
      </Link>

      <Link
        className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
        href={"/dashboard/users"}
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <circle cx="12" cy="6" r="4" fill="#000000"></circle>{" "}
            <path
              d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
              fill="#000000"
            ></path>{" "}
          </g>
        </svg>
        <p className="ml-2">Users</p>
      </Link>

      {(runningUser?.userRole === "super-admin" ||
        runningUser?.userRole === "admin") && (
        <Link
          className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
          href={"/dashboard/roles"}
        >
          <svg
            fill="#000000"
            width="21px"
            height="21px"
            viewBox="0 0 52 52"
            dataName="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" className=""></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path d="M38.3,27.2A11.4,11.4,0,1,0,49.7,38.6,11.46,11.46,0,0,0,38.3,27.2Zm2,12.4a2.39,2.39,0,0,1-.9-.2l-4.3,4.3a1.39,1.39,0,0,1-.9.4,1,1,0,0,1-.9-.4,1.39,1.39,0,0,1,0-1.9l4.3-4.3a2.92,2.92,0,0,1-.2-.9,3.47,3.47,0,0,1,3.4-3.8,2.39,2.39,0,0,1,.9.2c.2,0,.2.2.1.3l-2,1.9a.28.28,0,0,0,0,.5L41.1,37a.38.38,0,0,0,.6,0l1.9-1.9c.1-.1.4-.1.4.1a3.71,3.71,0,0,1,.2.9A3.57,3.57,0,0,1,40.3,39.6Z"></path>{" "}
              <circle cx="21.7" cy="14.9" r="12.9"></circle>{" "}
              <path d="M25.2,49.8c2.2,0,1-1.5,1-1.5h0a15.44,15.44,0,0,1-3.4-9.7,15,15,0,0,1,1.4-6.4.77.77,0,0,1,.2-.3c.7-1.4-.7-1.5-.7-1.5h0a12.1,12.1,0,0,0-1.9-.1A19.69,19.69,0,0,0,2.4,47.1c0,1,.3,2.8,3.4,2.8H24.9C25.1,49.8,25.1,49.8,25.2,49.8Z"></path>{" "}
            </g>
          </svg>
          <p className="ml-2">Roles</p>
        </Link>
      )}

      {(runningUser?.userRole === "doctor" ||
        runningUser?.userRole === "super-admin" ||
        runningUser?.userRole === "admin") && (
        <Link
          className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
          href={"/dashboard/appointments"}
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
          <p className="ml-2">Appointments</p>
        </Link>
      )}

      {(runningUser?.userRole === "lab-attendant" ||
        runningUser?.userRole === "super-admin" ||
        runningUser?.userRole === "admin") && (
        <Link
          className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
          href={"/dashboard/vaccinerequests"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 80 80"
            id="injection"
            className="w-9 md:w-6 h-9 md:h-6"
          >
            <path d="M73.05 5.293 59.205 19.139l-.365-.365a3.343 3.343 0 0 0-4.72 0l-1.921 1.922-.899-.898c-1.133-1.133-3.11-1.133-4.242 0L17.345 49.509l-1.556-1.556-1.414 1.414 5.245 5.245-6.933 6.933-.715-.716c-.778-.778-1.784-1.242-2.833-1.308-1.088-.074-2.107.302-2.847 1.041-1.493 1.493-1.374 4.042.266 5.681L14 73.685c.87.87 1.996 1.312 3.085 1.312.962 0 1.894-.346 2.595-1.046 1.492-1.492 1.373-4.04-.267-5.68l-.715-.716 6.932-6.932 3.689 3.689v-.001l1.556 1.556 1.415-1.414-1.557-1.556 29.712-29.711c.566-.567.878-1.32.878-2.122a2.98 2.98 0 0 0-.878-2.12L59.06 27.56l1.922-1.921a3.341 3.341 0 0 0 0-4.721l-.365-.365L74.465 6.707 73.05 5.293zM18 69.685c.86.86.98 2.14.267 2.852-.714.712-1.993.594-2.852-.266l-7.442-7.442c-.86-.86-.98-2.14-.266-2.852.3-.301.717-.463 1.181-.463.042 0 .084 0 .127.004.563.035 1.11.293 1.544.725l.715.716 6.01 6.01.716.716zm-.715-3.544L14.1 62.96l6.933-6.933 3.182 3.183-6.932 6.932zm41.747-34.37L29.319 61.483l-7.28-7.28-3.28-3.28 2.083-2.083 2.982 2.982 1.414-1.414-2.982-2.982 2.996-2.996 1.809 1.81 1.414-1.415-1.81-1.809 2.997-2.996 2.982 2.982 1.414-1.414-2.982-2.982 2.996-2.996 1.808 1.809 1.414-1.414-1.808-1.809 2.996-2.995 2.981 2.982 1.414-1.414-2.981-2.982 2.995-2.996L44.7 28.6l1.414-1.414-1.808-1.809 4.165-4.165a1 1 0 0 1 1.414 0l.898.898-.08.081 1.413 1.414.082-.08 6.833 6.832c.189.189.292.44.292.707a.995.995 0 0 1-.292.707zm.538-7.546-1.922 1.92-4.035-4.035 1.921-1.922a1.34 1.34 0 0 1 1.892 0l2.144 2.144a1.34 1.34 0 0 1 0 1.893z"></path>
          </svg>
          <p className="ml-2">Vaccine Requests</p>
        </Link>
      )}

      {(runningUser?.userRole === "receptionist" ||
        runningUser?.userRole === "super-admin" ||
        runningUser?.userRole === "admin") && (
        <Link
          className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
          href={"/dashboard/labtestapplies"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-9 md:w-6 h-9 md:h-6"
          >
            <path d="m13.293 2.707.818.818L3.318 14.318C2.468 15.168 2 16.298 2 17.5s.468 2.332 1.318 3.183C4.169 21.532 5.299 22 6.5 22s2.331-.468 3.182-1.318L20.475 9.889l.818.818 1.414-1.414-8-8-1.414 1.414zm3.182 8.354-2.403-2.404-1.414 1.414 2.403 2.404-1.414 1.415-.99-.99-1.414 1.414.99.99-1.415 1.415-2.403-2.404L7 15.728l2.403 2.404-1.136 1.136c-.945.944-2.59.944-3.535 0C4.26 18.795 4 18.168 4 17.5s.26-1.295.732-1.768L15.525 4.939l3.535 3.535-2.585 2.587z"></path>
          </svg>
          <p className="ml-2">Lab Test Registration</p>
        </Link>
      )}

      {runningUser?.userRole === "lab-attendant" && (
        <Link
          className="text-sm hover:bg-gray-300 flex items-center px-10 py-1 mx-1 my-2 rounded-md shadow-md md:shadow-none md:mx-0"
          href={"/dashboard/labreports"}
        >
          <img width="24" height="24" src="https://img.icons8.com/ios/50/health-graph.png" alt="health-graph"/><p className="ml-2">Lab Reports</p>
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
