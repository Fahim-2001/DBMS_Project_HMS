import LabReportForm from "@/app/dashboard/DashboardComponents/LabReportForm/LabReportForm";
import React from "react";

const page = async ({ params }) => {
  const labTestRequest = await fetch(
    `http://localhost:3000/api/labtests/${params.id}`,
    { cache: "no-store" }
  ).then((res) => res.json());
  
  
  return (
    <div>
      <LabReportForm  labTestRequest={labTestRequest}/>
    </div>
  );
};

export default page;
