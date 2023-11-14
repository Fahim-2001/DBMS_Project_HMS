import DoctorsForAppointments from "@/app/Components/DoctorsForAppointments/DoctorsForAppointments";
import Link from "next/link";
import React from "react";

const Appointments = async ({ params }) => {
  const doctors = await fetch(
    `http://localhost:3000/api/doctors/${params.slug}`,
    { cache: "no-store" }
  ).then((res) => res.json());
  // console.log(`Doctors from ${params.slug}: `, doctors);
  return (
    <div className="flex flex-wrap justify-center gap-10 mb-5">
      {doctors?.map((doctor) => (
        <DoctorsForAppointments key={doctor?.doc_id} props ={params} doctor={doctor}/>
      ))}
    </div>
  );
};

export default Appointments;
