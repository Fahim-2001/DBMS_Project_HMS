"use client";

import React, { useState } from "react";
import { generateLabReport } from "../utils/generateLabReport";
import { generatePrescription } from "../utils/generatePrescription";

const page = () => {
  const [docData, setDocData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const docCategory = e.target.document_category.value;
      const query = e.target.query.value;

      if (docCategory === "Prescription") {
        const appointment = await fetch(
          `${process.env.NEXT_PUBLIC_URL}api/appointment-by-uniqueid?uniqueId=${query}`,
          { cache: "no-store" }
        ).then((res) => res.json());
        setDocData(appointment);
      }
      if (docCategory === "Lab-Report") {
        const labReport = await fetch(
          `${process.env.NEXT_PUBLIC_URL}api/labtests/${query}`
        ).then((res) => res.json());
        setDocData(labReport);
      }
      
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }; 
  return (
    <div className="m-5">
      <form onSubmit={handleSubmit} className="flex">
        <select
          name="document_category"
          className="select select-bordered select-sm w-full max-w-xs mr-3"
        >
          <option defaultChecked value={"Lab-Report"}>
            Lab Report
          </option>
          <option value={"Prescription"}>Prescription</option>
        </select>
        <input
          type="text"
          name="query"
          placeholder="Type appointment unique id for prescription / lab report unique id for lab report here."
          className="input input-bordered input-sm w-full"
        />
        <button
          type="submit"
          className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-4 py-1 ml-2 rounded-xl"
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
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
          )}
        </button>
      </form>
      <div>
        <div className="overflow-x-auto">
          <table className="table text-center">
            {/* head */}
            <thead>
              <tr>
                <th>Id</th>
                <th>Patient Name</th>
                <th>Patient Contact</th>
                <th>{docData?.ref_doctor ? "Doctor" : "Number Of tests"}</th>
                <th>{docData?.department ? "Department" : "Payment Status"}</th>
                <th>{docData?.patient_name ? "Prescription" : "Report"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{docData?.appt_id || docData?.id}</th>
                <td>{docData?.patient_name || docData?.fullname}</td>
                <td>{docData?.patient_contact || docData?.contact}</td>
                <td>{docData?.ref_doctor || docData?.number_of_tests}</td>
                <td>{docData?.department || docData?.payment_status}</td>
                {docData?.patient_name ? <td>
                  {docData?.appt_status === "Unchecked" ? (
                    <p>Not Uploaded</p>
                  ) : (
                    <button
                      className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
                      onClick={() => {
                        generatePrescription(docData?.appt_id);
                      }}
                    >
                      Download Prescription
                    </button>
                  )}
                </td> : (docData?.payment_status === "Paid" &&
                docData?.report_status == "Uploaded" ? (
                  <td>
                    <button
                      onClick={() => {
                        generateLabReport(docData?.id);
                      }}
                      className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
                    >
                      Download Report
                    </button>
                  </td>
                ) : docData?.payment_status === "Due" ? (
                  <td>You have dues</td>
                ) : (
                  <td className="text-center">Not uploaded yet</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
