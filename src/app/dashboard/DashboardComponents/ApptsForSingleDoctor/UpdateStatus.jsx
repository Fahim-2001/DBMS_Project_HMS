"use client"
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

const UpdateStatus = ({ appt }) => {
  const [status, setStatus] = useState();
  const router = useRouter();
  const {singleUser} = useContext(UserDataContext)
  const updateStatus = async () => {
    try {
      // Status Update Method
      const response = await fetch(
        "http://localhost:3000/api/appointments/" + appt?.appt_id,
        {
          method: "PUT",
          body: JSON.stringify(status),
        }
      );
      router.refresh();
      if (response.ok) {
        console.log("Success");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    singleUser?.userRole==="doctor" ? <div className="flex">
    <select onChange={(e) => setStatus(e.target.value)}>
      <option defaultValue={appt?.appt_status}>{appt?.appt_status}</option>
      <option value="Unchecked">Unchecked</option>
      <option value="Checked">Checked</option>
    </select>
    <button
      className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
      onClick={updateStatus}
    >
      Update
    </button>
  </div>: <p>{appt?.appt_status}</p>
  );
};

export default UpdateStatus;
