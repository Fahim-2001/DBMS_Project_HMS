"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LabReportForm = ({ labTestRequest }) => {
  const [testName, setTestName] = useState("");
  const [report, setReport] = useState("");
  // const { register, handleSubmit } = useForm();
  // const [reps, setReps] = useState([])
  // console.log(labTestRequest);
  const tests = JSON.parse(labTestRequest.tests);
  // console.log(tests);

  let reports = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      testName,
      report,
    };
    console.log(data);
    reports = [...reports, data]
    form.reset();
  };

  const seeArray = () => {
    const data ={
      reports
    }
    console.log(data)
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
        <form action="" onSubmit={handleSubmit}>
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
                onChange={(e) => setReport(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-center my-3">
              <button
                type="submit"
                className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
              >
                Confirm Report
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
          onClick={seeArray}
        >
          See Array
        </button>
      </div>
    </div>
  );
};

export default LabReportForm;
