'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const UpdateVaccineStatus = ({req}) => {
    const router = useRouter();
    const [status, setStatus] = useState()
    const updateStatus = async() =>{
        try {
            // Status Update Method
            const response = await fetch(
              "http://localhost:3000/api/vaccineforms/" + req?.id,
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

    }
  return (
    <div className="flex">
      <select onChange={(e) => setStatus(e.target.value)}>
        <option defaultValue={req?.status}>{req?.status}</option>
        <option value="Vaccinated">Vaccinated</option>
        <option value="Pending">Pending</option>
      </select>
      <button
        className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
        onClick={updateStatus}
      >
        Update
      </button>
    </div>
  )
}

export default UpdateVaccineStatus