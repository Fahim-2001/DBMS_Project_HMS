"use client";
import { UserDataContext } from "@/app/frontend/Contexts/UserDataProvider/UserDataProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const DeleteUser = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const { runningUser } = useContext(UserDataContext);
  const router = useRouter();
  const deleteUser = async (email) => {
    try {
      setLoading(true);
      // Deleting user from the database
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/users?email=${email}`,
        {
          method: "DELETE",
        }
      );

      if (user?.userRole === "doctor") {
        await fetch(`${process.env.NEXT_PUBLIC_URL}api/doctors?email=${email}`, {
          method: "DELETE",
        });
      }
      router.refresh();

      if (response.ok) {
        toast.success("Successfully deleted user!", {
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
        toast.warning("User Deletion failed!", {
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
    (runningUser?.userRole === "super-admin" ||
      runningUser?.userRole === "admin") &&
    (user?.userRole === "super-admin" &&
    runningUser?.userRole !== "super-admin" ? (
      <div>
        <button
          className="mx-2 bg-gray-400 text-white font-semibold px-[8px] py-[3px] rounded-xl"
          disabled
        >
          Delete
        </button>
      </div>
    ) : (
      <div>
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
            onClick={() => deleteUser(user?.email)}
          >
            Delete
          </button>
        )}
      </div>
    ))
  );
};

export default DeleteUser;
