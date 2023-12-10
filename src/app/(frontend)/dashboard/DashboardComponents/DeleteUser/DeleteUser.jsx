"use client";
import { UserDataContext } from "@/app/(frontend)/Contexts/UserDataProvider/UserDataProvider";
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
        await fetch(
          `${process.env.NEXT_PUBLIC_URL}api/doctors?email=${email}`,
          {
            method: "DELETE",
          }
        );
      }
      router.refresh();

      if (response.ok) {
        toast.success("Successfully deleted user!", {
          position: "top-right",
          autoClose: 500,
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
          autoClose: 500,
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
          <button disabled className="flex justify-center items-center mx-2">
            <span className="loading loading-spinner loading-xs"></span>
          </button>
        ) : (
          <button
            className="flex justify-center items-center mx-2 text-red-600"
            title="Delete User"
            onClick={() => deleteUser(user?.email)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    ))
  );
};

export default DeleteUser;
