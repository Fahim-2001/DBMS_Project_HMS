"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import React, { useContext, useEffect, useState } from "react";
import { generateLabReport } from "../../../utils/generateLabReport";

const CurrentUsersLabReports = () => {
  const [labReports, setLabReports] = useState([]);
  const { runningUser } = useContext(UserDataContext);

  // Client Side Rendering using useEffect from Database
  useEffect(() => {
    const getAllReports = async () => {
      // Fetching method with a particular user's email
      await fetch(`http://localhost:3000/api/labtests/${runningUser?.email}`, {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => setLabReports(data));
    };
    getAllReports();
  }, [runningUser?.email]);


  // DATA BY PARTICULAR EMAIL WITH  REPORT ID
  const [reportId, setReportId] = useState();
  const [report, setReport] = useState(null);
  
  const handleSearchById = async (e) => {
    e.preventDefault();
    
    // Fetching method with a particular user's both email and report id
    await fetch(
      `http://localhost:3000/api/labtests/${runningUser?.email}/${reportId}`,
      {
        cache: "no-store",
      }
    )
      .then((res) => res.json())
      .then((data) => setReport(data));

    e.target.reset();
  };
  
  // Parsing if the report exists otherwise contain null.
  const tests = JSON.parse(report? report.tests : "null");
  
  
  return (
    <div className="text-xs">
          {/* Search By Report Id Field */}
          <form className="flex" action="post" onSubmit={handleSearchById}>
            <input
              type="text"
              placeholder="Search here with your report Id"
              className="input input-bordered input-sm w-full"
              onChange={(e)=>setReportId(e.target.value)}
            />
            <button
              type="submit"
              className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-4 py-1 ml-2 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>
      {/* Search Result in a table if report is not null */}
      {report !=null && (
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr className="text-center">
                <th>Id</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Number of tests</th>
                <th>Tests</th>
                <th>Payment Status</th>
                <th>Payable Amount</th>
                <th>Paid Amount</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              <tr key={report?.id}>
                <td className="font-semibold">{report?.id}</td>
                <td>{report?.fullname}</td>
                <td>{report?.contact}</td>
                <td>{report?.email}</td>
                <td>{report?.gender}</td>
                <td>{report?.number_of_tests}</td>
                <td>
                {JSON.parse(report?.tests).map((test) => (
                  <p key={test?.id}>{test.test}</p>
                ))}
              </td>
                <td>{report?.payment_status}</td>
                <td>{report?.payable_amount} BDT</td>
                <td>{report?.advanced_amount} BDT</td>
                {report?.payment_status === "Paid" &&
                report?.report_status == "Uploaded" ? (
                  <td>
                    <button
                      onClick={() => {generateLabReport(report?.id);setReport(null)}}
                      className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
                    >
                      Download
                    </button>
                  </td>
                ) : report?.payment_status === "Due" ? (
                  <td>You have dues</td>
                ) : (
                  <td className="text-center">Not uploaded yet</td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-between text-xs font-semibold mr-3">
        <p> Your Booked Appointments Table</p>
        <p>Total Count :{labReports?.length}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr className="text-center">
              <th>Id</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Number of tests</th>
              <th>Tests</th>
              <th>Payment Status</th>
              <th>Payable Amount</th>
              <th>Paid Amount</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {labReports.map((rep) => (
              <tr key={rep?.id}>
                <td className="font-semibold">{rep?.id}</td>
                <td>{rep?.fullname}</td>
                <td>{rep?.contact}</td>
                <td>{rep?.email}</td>
                <td>{rep?.gender}</td>
                <td>{rep?.number_of_tests}</td>
                <td>
                  {JSON.parse(rep?.tests).map((test) => (
                    <p key={test?.id}>{test.test}</p>
                  ))}
                </td>
                <td>{rep?.payment_status}</td>
                <td>{rep?.payable_amount} BDT</td>
                <td>{rep?.advanced_amount} BDT</td>
                {rep?.payment_status === "Paid" &&
                rep?.report_status == "Uploaded" ? (
                  <td>
                    <button
                      onClick={() => generateLabReport(rep?.id)}
                      className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
                    >
                      Download
                    </button>
                  </td>
                ) : rep?.payment_status === "Due" ? (
                  <td>You have dues</td>
                ) : (
                  <td className="text-center">Not uploaded yet</td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-center">
              <th>Id</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Number of tests</th>
              <th>Tests</th>
              <th>Payment Status</th>
              <th>Payable Amount</th>
              <th>Paid Amount</th>
              <th>Report</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CurrentUsersLabReports;
