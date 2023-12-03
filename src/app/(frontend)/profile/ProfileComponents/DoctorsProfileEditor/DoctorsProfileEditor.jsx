import React from "react";
import DoctorsProfileEditorForm from "../DoctorsProfileEditorForm/DoctorsProfileEditorForm";

const DoctorsProfileEditor = async ({ doctorCredentials }) => {
  const doctor = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/doctors/${doctorCredentials?.email}`,
    { cache: "no-store" }
  ).then((res) => res.json());
  doctor.user_id = doctorCredentials?.id;

  return (
    <div>
      <DoctorsProfileEditorForm doctor={doctor} />
    </div>
  );
};

export default DoctorsProfileEditor;
