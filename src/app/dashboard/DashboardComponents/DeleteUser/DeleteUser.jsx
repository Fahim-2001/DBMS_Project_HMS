"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const DeleteUser = ({ user }) => {
  const router = useRouter();
  const deleteUser = async (email) => {
    try {
      // Deleting user from the database
      const response = await fetch(`http://localhost:3000/api/users?email=${email}`, {
        method: "DELETE",
      });
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
      }else{
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
        console.log(error.message)
    }
  };
  return (
    <div>
      <button
        className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
        onClick={()=>deleteUser(user?.email)}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteUser;
