"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

const ApptsForSingleDoctor = () => {
  const session = useSession();
  const { runningUser } = useContext(UserDataContext);
  // console.log(session);

  const [appointments, setAppointments] = useState();
  useEffect(() => {
    // Data for super-admin and admin
    if (
      runningUser?.userRole === "super-admin" ||
      runningUser?.userRole === "admin"
    ) {
      const getAppts = async () => {
        await fetch(`http://localhost:3000/api/appointments`, {
          cache: "no-store",
        })
          .then((res) => res.json())
          .then((data) => setAppointments(data));
      };
      getAppts();
    }

    // Data for Doctor
    if (runningUser?.userRole === "doctor") {
      const getAppts = async () => {
        await fetch(
          `http://localhost:3000/api/appointments_for_single_doctor?doctoremail=${session?.data?.user?.email}`,
          { cache: "no-store" }
        )
          .then((res) => res.json())
          .then((data) => setAppointments(data));
      };
      getAppts();
    }
  }, [session?.data?.user?.email]);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between text-xs font-semibold mr-3">
        <p>Appointments Table</p>
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
            {(runningUser?.userRole === "super-admin" ||
              runningUser?.userRole === "admin") && <th>Doctor's Name</th>}
            <th>Status</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appt) => (
            <tr key={appt?.appt_id}>
              <td>{appt?.appt_id}</td>
              <td>{appt?.patient_name}</td>
              <td>{appt?.patient_contact}</td>
              <td>{appt?.patient_gender}</td>
              <td>{appt?.appt_date}</td>
              <td>{appt?.patient_issue}</td>
              {(runningUser?.userRole === "super-admin" ||
                runningUser?.userRole === "admin") && (
                <td>{appt?.ref_doctor}</td>
              )}
              <td>{appt?.appt_status}</td>
              <td>
                {appt?.appt_status === "Unchecked" ? (
                  runningUser?.userRole === "doctor" ? (
                    <Link
                      href={`/dashboard/appointments/${appt?.appt_id}`}
                      className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
                    >
                      Upload
                    </Link>
                  ) : (
                    <p>Not Uploaded</p>
                  )
                ) : (
                  <p>Uploaded</p>
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
            {(runningUser?.userRole === "super-admin" ||
              runningUser?.userRole === "admin") && <th>Doctor's Name</th>}
            <th>Status</th>
            <th>Prescription</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ApptsForSingleDoctor;
