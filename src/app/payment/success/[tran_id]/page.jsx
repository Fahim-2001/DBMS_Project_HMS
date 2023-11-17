"use client";
import { generateAppointmentInvoice } from "@/app/Components/AppointmentForm/generateAppointmentInvoice";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const PaymentSuccess = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getAppointmentInfo = async (tran_id) => {
    try {
      setLoading(true);

      const appointment = await fetch(
        `http://localhost:3000/api/payment/success/${tran_id}`,
        { cache: "no-store" }
      ).then((res) => res.json());

      console.log(appointment);

      generateAppointmentInvoice(appointment)
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center flex flex-col justify-center items-center my-24">
      <div className="flex items-center text-green-400">
        <p className="text-4xl font-bold">Payment Successful </p>
        <p className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </p>
      </div>
      <p className="text-2xl font-semibold">Transaction Id: {params.tran_id}</p>
      <div className="flex gap-5 text-sm">
        <button
          className="px-8 py-2.5 my-5 leading-5 text-white font-semibold transition-colors duration-300 transform bg-primary rounded-md hover:bg-secondary"
          onClick={() => router.push("/")}
        >
          Back to home
        </button>
        <button
          className="flex items-center gap-1 px-5 py-2.5 my-5 leading-5 text-white font-semibold transition-colors duration-300 transform bg-primary rounded-md hover:bg-secondary"
          onClick={() => getAppointmentInfo(params.tran_id)}
        >
          <span>{loading ? "Downloading" : "Download"} Invoice</span>
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
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
