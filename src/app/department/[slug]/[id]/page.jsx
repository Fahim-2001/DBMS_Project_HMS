import AppointmentForm from "@/app/Components/AppointmentForm/AppointmentForm";
import React from "react";

const SingleDoctorForAppointments = async ({ params }) => {
  const doctor = await fetch(
    `http://localhost:3000/api/doctor?doctor_id=${params.id}`,
    { cache: "no-store" }
  ).then((res) => res.json());
  // console.log("Doctor-", doctor);
  return (
    <div>
      <p>Appointment Form</p>
      <AppointmentForm doctor={doctor}/>
    </div>
  );
};

export default SingleDoctorForAppointments;
