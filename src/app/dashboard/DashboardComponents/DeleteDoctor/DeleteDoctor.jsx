"use client"
import { UserDataContext } from '@/app/Contexts/UserDataProvider/UserDataProvider';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { toast } from 'react-toastify';

const DeleteDoctor = ({doctor}) => {
    const {runningUser} = useContext(UserDataContext)
    const router = useRouter();
    const deleteUser = async (email) => {
      try {
        // Deleting user from the database
        const response = await fetch(`http://localhost:3000/api/doctors?email=${email}`, {
          method: "DELETE",
        });

        const response2 = await fetch(
          `http://localhost:3000/api/users?email=${email}`,
          {
            method: "DELETE",
          }
        );
        router.refresh();
  
        if (response.ok && response2.ok) {
          toast.success("Successfully deleted doctor!", {
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
      (runningUser?.userRole==="super-admin" ||runningUser?.userRole==="admin")&&<div>
        {runningUser?.userRole !== 'doctor'&&<button
          className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
          onClick={()=>deleteUser(doctor?.email)}
        >
          Delete
        </button>}
      </div>
    );
}

export default DeleteDoctor