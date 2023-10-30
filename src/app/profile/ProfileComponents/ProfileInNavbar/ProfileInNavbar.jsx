"use client";

import Link from "next/link";
import React from "react";

const ProfileInNavbar = ({ singleUser }) => {
//   console.log(singleUser);
  return (
    <div>
      <div className="">
        <div className="flex justify-end mr-2 mt-2" title="Edit Profile">
          <Link href={"/profile"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
        </div>
        <div className="flex justify-center avatar my-3">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
            {singleUser?.picture ? (
              <img src={singleUser?.picture} alt="Picture of user" />
            ) : (
              <img
                src={
                  singleUser?.gender == "male"
                    ? "https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3KPUL8FzWe7WpCqb0fIy6Q2uBRhtydqEFeg&usqp=CAU"
                }
              />
            )}
          </div>
        </div>
        <div className="text-center mb-5">
          <h3 className="font-semibold text-sm">{singleUser?.fullname}</h3>
          <p className="text-xs">{singleUser?.userRole}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInNavbar;
