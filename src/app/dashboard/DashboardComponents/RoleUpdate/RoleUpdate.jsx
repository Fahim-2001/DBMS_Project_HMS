"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";


const RoleUpdate = ({ user }) => {
  const [role, setRole] = useState("");
  const router = useRouter();

  const updateRole = async () => {
    const newRole = {
      email: user?.email,
      userRole: role,
    };
    
    // Update Role POST method
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRole),
      });
      router.refresh();
      
      if (response.ok) {
        toast.success("Successfully updated role!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }else{
        toast.warning("Role update failed!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex">
      <select onChange={(e) => setRole(e.target.value)}>
        <option defaultValue={user?.userRole}>{user?.userRole}</option>
        <option value="super-admin">super-admin</option>
        <option value="admin">admin</option>
        <option value="moderator">moderator</option>
        <option value="user">user</option>
      </select>
      <button
        className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
        onClick={updateRole}
      >
        Update
      </button>
    </div>
  );
};


export default RoleUpdate;