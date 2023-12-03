import AppointmentForm from "@/app/(frontend)/Components/AppointmentForm/AppointmentForm";
import React from "react";

const SingleDoctorForAppointments = async ({ params }) => {
  const doctor = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/doctors/${params.id}`,
    { cache: "no-store" }
  ).then((res) => res.json());
  // console.log("Doctor-", doctor);
  return (
    <div>
      <p className="text-lg text-center my-2">Book your appointment for <span className="font-semibold">{doctor[0]?.first_name}</span></p>
      <AppointmentForm doctor={doctor[0]}/>
    </div>
  );
};

export default SingleDoctorForAppointments;
