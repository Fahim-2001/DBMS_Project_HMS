"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const RoleUpdate = ({ user }) => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { runningUser } = useContext(UserDataContext);
  // console.log(user);
  const updateRole = async () => {
    setLoading(true);
    const newRole = {
      userRole: role,
    };

    // Update Role POST method
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${user?.id}`,
        {
          method: "PUT",
          body: JSON.stringify(newRole),
        }
      );
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
        setLoading(false);
      } else {
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
      {user?.userRole === "super-admin" &&
      runningUser?.userRole !== "super-admin" ? (
        <div className="flex">
          <p className="mr-6">{user?.userRole}</p>
          <button
            className="mx-2 bg-gray-400 text-white font-semibold px-[8px] py-[3px] rounded-xl"
            disabled
          >
            Update
          </button>
        </div>
      ) : (
        <div className="flex">
          <select className="" onChange={(e) => setRole(e.target.value)}>
            <option defaultValue={user?.userRole}>{user?.userRole}</option>
            <option value="super-admin">super-admin</option>
            <option value="admin">admin</option>
            <option value="receptionist">receptionist</option>
            <option value="lab-attendant">lab-attendant</option>
            <option value="user">user</option>
          </select>
          {loading ? (
            <button
              disabled
              className="flex justify-center items-center mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
            >
              <span className="loading loading-spinner loading-xs"></span>
            </button>
          ) : (
            <button
              className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
              onClick={updateRole}
            >
              Update
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RoleUpdate;
