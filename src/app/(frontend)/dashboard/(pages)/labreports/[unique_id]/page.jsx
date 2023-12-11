import LabReportForm from "@/app/(frontend)/dashboard/DashboardComponents/LabReportForm/LabReportForm";
import React from "react";

const page = async ({ params }) => {
  const labTestRequest = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/labtests/${params.unique_id}`,
    { cache: "no-store" }
  ).then((res) => res.json());
  
  // console.log(labTestRequest)
  
  return (
    <div>
      <LabReportForm  labTestRequest={labTestRequest}/>
    </div>
  );
};

export default page;
