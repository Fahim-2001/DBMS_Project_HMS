import Link from "next/link";
import React from "react";

const page = async ({ params }) => {
  const doctors = await fetch(
    `http://localhost:3000/api/doctors_by_department?department=${params.slug}`, {cache:"no-store"}
  ).then((res) => res.json());
  console.log(`Doctors from ${params.slug}: `, doctors);
  return (
    <div>
      {
        doctors?.map((doctor)=>(
          <Link href={`/department/${params?.slug}/${doctor?.doc_id}`} key={doctor?.doc_id} doctor={doctor}>{doctor?.first_name}</Link>
        ))
      }
    </div>
  );
};

export default page;
