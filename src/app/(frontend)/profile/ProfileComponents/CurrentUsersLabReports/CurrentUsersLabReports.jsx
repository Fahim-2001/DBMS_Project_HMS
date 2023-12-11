"use client";
import { UserDataContext } from "@/app/(frontend)/Contexts/UserDataProvider/UserDataProvider";
import React, { useContext, useEffect, useState } from "react";
import { generateLabReport } from "../../../utils/generateLabReport";

const CurrentUsersLabReports = () => {
  const [labReports, setLabReports] = useState([]);
  const { runningUser } = useContext(UserDataContext);

  // Client Side Rendering using useEffect from Database
  useEffect(() => {
    const getAllReports = async () => {
      // Fetching method with a particular user's email
      await fetch(`${process.env.NEXT_PUBLIC_URL}api/labtests/${runningUser?.email}`, {
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
      `${process.env.NEXT_PUBLIC_URL}api/labtests/${runningUser?.email}/${reportId}`,
      {
        cache: "no-store",
      }
    )
      .then((res) => res.json())
      .then((data) => setReport(data));

    e.target.reset();
  };

  // Parsing if the report exists otherwise contain null.
  const tests = JSON.parse(report ? report.tests : "null");

  return (
    <div className="text-xs">
      {/* Search By Report Id Field */}
      <form className="flex" action="post" onSubmit={handleSearchById}>
        <input
          type="text"
          placeholder="Search here with your report Id"
          className="input input-bordered input-sm w-full"
          onChange={(e) => setReportId(e.target.value)}
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
      {report != null && (
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
                      onClick={() => {
                        generateLabReport(report?.id);
                        setReport(null);
                      }}
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
        <p> Your Registered Lab Reports Table</p>
        <div className="flex gap-2 items-center">
          <p>Total Count :{labReports?.length}</p>
          <svg
            fill="#000000"
            width="18px"
            height="18px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => router.refresh()}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M0 16q0-2.784 1.088-5.312t2.912-4.384 4.384-2.912 5.344-1.088q2.784 0 5.312 1.088t4.384 2.912 2.912 4.384 1.088 5.312h2.304q0.736 0 1.28 0.416t0.8 1.024 0.16 1.28-0.64 1.184l-4.576 4.576q-0.672 0.672-1.6 0.672t-1.632-0.672l-4.576-4.576q-0.512-0.512-0.608-1.184t0.128-1.28 0.8-1.024 1.312-0.416h2.272q0-2.464-1.216-4.576t-3.328-3.328-4.576-1.216-4.608 1.216-3.328 3.328-1.216 4.576 1.216 4.608 3.328 3.328 4.608 1.216q1.728 0 3.36-0.64l3.424 3.392q-3.136 1.824-6.784 1.824-2.816 0-5.344-1.088t-4.384-2.912-2.912-4.384-1.088-5.344z"></path>
            </g>
          </svg>
        </div>
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
            {labReports?.map((rep) => (
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
