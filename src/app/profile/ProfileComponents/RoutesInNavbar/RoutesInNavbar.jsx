import Link from "next/link";
import React from "react";

const RoutesInNavbar = ({ singleUser }) => {
  //   console.log(singleUser);
  return (
    <div>
      <nav className="flex flex-col">
        {singleUser?.userRole === "doctor" ? (
          <Link
            href={"/profile/doctorsappointments"}
            className="text-sm hover:bg-gray-300 px-3 py-2 my-1"
          >
            Your Appointments
          </Link>
        ) : (
          <Link href={"/profile/yourappointments"} className="text-sm hover:bg-gray-300 px-3 py-2 my-1">
            Your Booked Appointments
          </Link>
        )}
        <Link href={'/profile/labreports'} className="text-sm hover:bg-gray-300 px-3 py-2 my-1">Your Lab Reports</Link>
      </nav>
    </div>
  );
};

export default RoutesInNavbar;
