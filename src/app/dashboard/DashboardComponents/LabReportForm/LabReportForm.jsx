"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

let reports = [];

const LabReportForm = ({ labTestRequest }) => {
  const [testName, setTestName] = useState("");
  const [reportTexts, setReportTexts] = useState("");
  const router = useRouter();
  const tests = JSON.parse(labTestRequest.tests);
  // console.log(labTestRequest);

  // Function to add test reports
  const handleAddReports = (e) => {
    e.preventDefault();
    const form = e.target;
    const reportData = {
      testName,
      reportTexts,
    };
    reports.push(reportData);
    toast.success(`${reportData.testName} Report Added`, {
      position: "top-right",
      autoClose: 1000,
    });
    form.reset();
  };

  // Function to submit the reports
  const handleSubmitReport = async () => {
    try {
      const updateBody = {
        report_status: "Uploaded",
        reports,
      };
      const response = await fetch(
        `http://localhost:3000/api/labtests/${labTestRequest?.id}`,
        {
          method: "PUT",
          body: JSON.stringify(updateBody),
        }
      );
      router.refresh();

      if (response.ok) {
        toast.success("Report Uploaded", {
          position: "top-right",
          autoClose: 1000,
        });
        reports = [];
      } else {
        toast.warning("Report Upload Failed", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="text-xs">
      <div>
        <p className="font-semibold">Lab Report Submission Form</p>
      </div>
      <div className="my-2 flex justify-evenly">
        <p className="mr-2">
          <span className="font-medium">Full Name:</span>{" "}
          {labTestRequest?.fullname}
        </p>
        <p className="mr-2">
          <span className="font-medium">Age:</span> {labTestRequest?.age}
        </p>
        <p className="mr-2">
          <span className="font-medium">Gender:</span> {labTestRequest?.gender}
        </p>
        <p className="mr-2">
          <span className="font-medium">Email:</span> {labTestRequest?.email}
        </p>
        <p className="mr-2">
          <span className="font-medium">Number of Tests:</span>{" "}
          {labTestRequest?.number_of_tests}
        </p>
      </div>

      <div className="">
        <form action="" onSubmit={handleAddReports}>
          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Test Name</span>
              </label>
              <select
                className="input input-bordered input-sm w-full text-sm"
                onChange={(e) => setTestName(e.target.value)}
              >
                <option value="">Select Test</option>
                {tests?.map((test) => (
                  <option key={test?.id} value={test?.test}>
                    {test?.test}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Test Report</span>
              </label>
              <textarea
                id=""
                className="input input-bordered input-sm w-full text-sm"
                cols="30"
                rows="10"
                onChange={(e) => setReportTexts(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-center my-3">
              <button
                type="submit"
                className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
              >
                Add Report
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
          onClick={handleSubmitReport}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default LabReportForm;
