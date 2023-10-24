"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import UpdateStatus from "./UpdateStatus";

const ApptsForSingleDoctor = () => {
  const session = useSession();
  // console.log(session);

  const [appointments, setAppointments] = useState();
  useEffect(() => {
    const getAppts = async () => {
      await fetch(
        `http://localhost:3000/api/appointments_for_single_doctor?doctoremail=${session?.data?.user?.email}`,
        { cache: "no-store" }
      )
        .then((res) => res.json())
        .then((data) => setAppointments(data));
    };
    getAppts();
  }, [session?.data?.user?.email]);

  // console.log(appointments);
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
            <th>Status</th>
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
              <td>
                <UpdateStatus appt={appt} />
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
            <th>Status</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ApptsForSingleDoctor;