import React from "react";

const LabReportForm = ({ labTestRequest }) => {
  console.log(labTestRequest);
  const tests = JSON.parse(labTestRequest.tests);
  console.log(tests);
  return <div>LabReportForm</div>;
};

export default LabReportForm;
