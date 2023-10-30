import Link from "next/link";
import React from "react";

const RoutesInNavbar = ({ singleUser }) => {
  //   console.log(singleUser);
  return (
    <div>
      <nav className="flex flex-col">
        {(singleUser?.userRole==='doctor'|| singleUser?.userRole==='user')&&<Link
          href={"/profile/appointments"}
          className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
        >
          {singleUser?.userRole === "doctor"
            ? "Your Appointments"
            : "Booked Appointments"}
        </Link>}
      </nav>
    </div>
  );
};

export default RoutesInNavbar;
