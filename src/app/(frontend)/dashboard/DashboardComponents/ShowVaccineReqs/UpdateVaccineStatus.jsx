"use client";
import { UserDataContext } from "@/app/(frontend)/Contexts/UserDataProvider/UserDataProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const UpdateVaccineStatus = ({ req }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState();
  const { runningUser } = useContext(UserDataContext);

  const updateStatus = async () => {
    try {
      setLoading(true);
      // Status Update Method
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/vaccineforms/` + req?.id,
        {
          method: "PUT",
          body: JSON.stringify(status),
        }
      );
      router.refresh();
      if (response.ok) {
        toast.success("Updated", { position: "top-right", autoClose: 1000 });
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex">
      {(runningUser?.userRole === "super-admin" ||
        runningUser?.userRole === "lab-attendant") &&
      req?.status === "Pending" ? (
        <>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option defaultValue={req?.status}>{req?.status}</option>
            <option value="Vaccinated">Vaccinated</option>
            <option value="Pending">Pending</option>
          </select>
          <button
            className="mx-2 my-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
            onClick={updateStatus}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Update"
            )}
          </button>
        </>
      ) : (
        <p>{req?.status}</p>
      )}
    </div>
  );
};

export default UpdateVaccineStatus;
