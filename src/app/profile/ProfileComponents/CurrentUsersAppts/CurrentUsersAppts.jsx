"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { generatePrescription } from "../prescription";

const CurrentUsersAppts = () => {
  const { singleUser } = useContext(UserDataContext);
  const [appointments, setAppointments] = useState();

  useEffect(() => {
    const getAppts = async () => {
      await fetch(
        `http://localhost:3000/api/appointments/${singleUser?.email}`,
        {
          cache: "no-store",
        }
      )
        .then((res) => res.json())
        .then((data) => setAppointments(data));
    };
    getAppts();
  }, [singleUser?.email]);

  console.log(appointments);
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between text-xs font-semibold mr-3">
        <p> Your Booked Appointments Table</p>
        <p>Total Count :{appointments?.length}</p>
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Date</th>
            <th>Problem</th>
            <th>Doctor's Name</th>
            <th>Status</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appt) => (
            <tr key={appt?.appt_id}>
              <td className="font-semibold">{appt?.appt_id}</td>
              <td>{appt?.patient_name}</td>
              <td>{appt?.patient_contact}</td>
              <td>{appt?.patient_gender}</td>
              <td>{appt?.appt_date}</td>
              <td>{appt?.patient_issue}</td>
              {(singleUser?.userRole === "super-admin" ||
                singleUser?.userRole === "admin") && (
                <td>{appt?.ref_doctor}</td>
              )}
              <td>{appt?.appt_status}</td>
              <td>
                {appt?.appt_status === "Unchecked" ? (
                  <p>Not Uploaded</p>
                ) : (
                  <button
                    className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
                    onClick={() => generatePrescription(appt?.appt_id)}
                  >
                    Download
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Date</th>
            <th>Problem</th>
            <th>Doctor's Name</th>
            <th>Status</th>
            <th>Prescription</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CurrentUsersAppts;
