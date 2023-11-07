"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import React, { useContext, useEffect, useState } from "react";
import { generateLabReport } from "../../utils/generateLabReport";

const CurrentUsersLabReports = () => {
  const [labReports, setLabReports] = useState([]);
  const { singleUser } = useContext(UserDataContext);

  // Client Side Rendering using useEffect from Database
  useEffect(() => {
    const getAllReports = async () => {
      await fetch(`http://localhost:3000/api/labtests/${singleUser?.email}`, {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => setLabReports(data));
    };
    getAllReports();
  }, [singleUser?.email]);

  
  // console.log("All ->", labReports);

  return (
    <div className="text-xs">
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
                {rep?.payment_status === "Paid" && rep?.report_status=='Uploaded' ? (
                  <td>
                    <button onClick={()=>generateLabReport(rep?.id)} className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl">
                      Download
                    </button>
                  </td>
                ) : (
                  rep?.payment_status==='Due' ?<td>You have dues</td>:<td className="text-center">Not uploaded yet</td>
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
