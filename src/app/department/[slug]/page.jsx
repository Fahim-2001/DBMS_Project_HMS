import React from "react";

const page = async ({ params }) => {
  const doctors = await fetch(
    `http://localhost:3000/api/doctors_by_department?department=${params.slug}`
  ).then((res) => res.json());
  console.log(`Doctors from ${params.slug}: `, doctors);
  return (
    <div>
      {
        doctors?.map((doctor)=>(
          <p key={doctor?.doc_id}>{doctor.first_name}</p>
        ))
      }
    </div>
  );
};

export default page;
