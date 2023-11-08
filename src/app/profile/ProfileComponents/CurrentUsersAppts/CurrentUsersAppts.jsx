"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { generatePrescription } from "../../utils/generatePrescription";

const CurrentUsersAppts = () => {
  const { singleUser } = useContext(UserDataContext);
  const [appointments, setAppointments] = useState();

  // Appointment Data Fetching sending user's email those are under the email.
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

  // Appointment Data Fetching sending user's email those are under the email.
  const [id, setId] = useState();
  const [appointment, setAppointment] = useState(null);
  const handleSearchById = async (e) => {
    e.preventDefault();
    await fetch(
      `http://localhost:3000/api/appointments/${singleUser?.email}/${id}`,
      {
        cache: "no-store",
      }
    )
      .then((res) => res.json())
      .then((data) => setAppointment(data));

    e.target.reset();
  };
  return (
    <div>
      {/* Search By Report Id Field */}
      <form className="flex" action="post" onSubmit={handleSearchById}>
        <input
          type="text"
          placeholder="Search here with your report Id"
          className="input input-bordered input-sm w-full"
          onChange={(e) => setId(e.target.value)}
        />
        <button
          type="submit"
          className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-4 py-1 ml-2 rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
      {appointment != null && (
        <div className="overflow-x-auto">
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
              <tr>
                <td className="font-semibold">{appointment?.appt_id}</td>
                <td>{appointment?.patient_name}</td>
                <td>{appointment?.patient_contact}</td>
                <td>{appointment?.patient_gender}</td>
                <td>{appointment?.appt_date}</td>
                <td>{appointment?.patient_issue}</td>
                {(singleUser?.userRole === "super-admin" ||
                  singleUser?.userRole === "admin") && (
                  <td>{appointment?.ref_doctor}</td>
                )}
                <td>{appointment?.appt_status}</td>
                <td>
                  {appointment?.appt_status === "Unchecked" ? (
                    <p>Not Uploaded</p>
                  ) : (
                    <button
                      className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
                      onClick={() => {generatePrescription(appointment?.appt_id); setAppointment(null)}}
                    >
                      Download
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-between text-xs font-semibold mr-3">
        <p> Your Booked Appointments Table</p>
        <p>Total Count :{appointments?.length}</p>
      </div>
      <div className="overflow-x-auto">
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
    </div>
  );
};

export default CurrentUsersAppts;
