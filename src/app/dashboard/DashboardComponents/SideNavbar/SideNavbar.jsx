import Link from "next/link";
import React from "react";

const SideNavbar = () => {
  return (
    <div>
      <nav className="flex flex-col">
        <Link className="hover:bg-gray-300 px-3 py-2 my-1" href={"/dashboard/adddoctors"}>Add Doctors</Link>
        <Link className="hover:bg-gray-300 px-3 py-2 my-1" href={"/dashboard/users"}>Users</Link>
        <Link className="hover:bg-gray-300 px-3 py-2 my-1" href={"/dashboard/roles"}>Roles</Link>
      </nav>
    </div>
  );
};

export default SideNavbar;
