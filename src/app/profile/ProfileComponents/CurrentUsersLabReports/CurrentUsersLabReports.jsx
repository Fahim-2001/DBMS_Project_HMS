"use client";
import React, { useEffect, useState } from "react";

const CurrentUsersLabReports = () => {
  const [reportId, setReportId] = useState();
  const [report, setReport] = useState({});
  const [labReports, setLabReports] = useState();
  console.log(reportId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reportId) {
      await fetch(`http://localhost:3000/api/labtests/${reportId}`, {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => setReport(data));
    }
    e.target.reset();
  };
  console.log(report);

  useEffect(() => {
    const getAllReports = async () => {
      await fetch(`http://localhost:3000/api/labtests`)
        .then((res) => res.json())
        .then((data) => setLabReports(data));
    };
    getAllReports();
  }, []);

  console.log(labReports)
  return (
    <div className="text-xs">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by your report id"
          className="input input-bordered input-sm w-full"
          onChange={(e) => setReportId(e.target.value)}
        />
        <button
          type="submit"
          className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-4 py-1 rounded-xl cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="font-semibold w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
      <div className="flex justify-between mt-2 font-semibold">
        <p> Your Booked Labreport's Table</p>
        <p>Total Count : <span className="mx-2">{labReports?.length}</span></p>
      </div>
    </div>
  );
};

export default CurrentUsersLabReports;
