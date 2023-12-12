"use client";
import { UserDataContext } from "@/app/(frontend)/Contexts/UserDataProvider/UserDataProvider";
import React, { useContext, useEffect, useState } from "react";
import { generatePrescription } from "../../../utils/generatePrescription";
import { useRouter } from "next/navigation";

const CurrentUsersAppts = () => {
  const router = useRouter();
  const { runningUser } = useContext(UserDataContext);
  const [appointments, setAppointments] = useState([]);

  // Appointment Data Fetching sending user's email those are under the email.
  useEffect(() => {
    const getAppts = async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/appointments/${runningUser?.email}`,
        {
          cache: "no-store",
        }
      )
        .then((res) => res.json())
        .then((data) => setAppointments(data));
    };
    getAppts();
  }, [runningUser?.email]);

  // Appointment Data Fetching sending user's email those are under the email.
  const [id, setId] = useState();
  const [appointment, setAppointment] = useState(null);

  const handleSearchById = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/appointments/${runningUser?.email}/${id}`,
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
          placeholder="Search here with your appointment Id"
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
                {(runningUser?.userRole === "super-admin" ||
                  runningUser?.userRole === "admin") && (
                  <td>{appointment?.ref_doctor}</td>
                )}
                <td>{appointment?.appt_status}</td>
                <td>
                  {appointment?.appt_status === "Unchecked" ? (
                    <p>Not Uploaded</p>
                  ) : (
                    <button
                      className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
                      onClick={() => {
                        generatePrescription(appointment?.appt_id);
                        setAppointment(null);
                      }}
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
        <p> Your Booked Appointments</p>
        <div className="flex gap-2 items-center">
          <p>Total Count :{appointments?.length}</p>
          <svg
            fill="#000000"
            width="18px"
            height="18px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => router.refresh()}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M0 16q0-2.784 1.088-5.312t2.912-4.384 4.384-2.912 5.344-1.088q2.784 0 5.312 1.088t4.384 2.912 2.912 4.384 1.088 5.312h2.304q0.736 0 1.28 0.416t0.8 1.024 0.16 1.28-0.64 1.184l-4.576 4.576q-0.672 0.672-1.6 0.672t-1.632-0.672l-4.576-4.576q-0.512-0.512-0.608-1.184t0.128-1.28 0.8-1.024 1.312-0.416h2.272q0-2.464-1.216-4.576t-3.328-3.328-4.576-1.216-4.608 1.216-3.328 3.328-1.216 4.576 1.216 4.608 3.328 3.328 4.608 1.216q1.728 0 3.36-0.64l3.424 3.392q-3.136 1.824-6.784 1.824-2.816 0-5.344-1.088t-4.384-2.912-2.912-4.384-1.088-5.344z"></path>
            </g>
          </svg>
        </div>
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
                <td>{appt?.ref_doctor}</td>
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
