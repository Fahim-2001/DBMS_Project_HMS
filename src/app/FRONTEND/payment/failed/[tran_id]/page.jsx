'use client'
import { useRouter } from "next/navigation";
import React from "react";

const PaymentFailed = ({ params }) => {
    const router = useRouter();
  return (
    <div>
      <div className="text-center flex flex-col justify-center items-center my-20">
        <div className="flex items-center text-red-600">
          <p className="text-4xl font-bold">Payment Failed </p>
          <p className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </p>
        </div>
        <p className="text-2xl font-semibold">
          Transaction Id: {params.tran_id}
        </p>
        <p className="font-semibold my-2">Please Try Again</p>
        <button className="px-8 py-2.5 my-5 leading-5 text-white font-semibold transition-colors duration-300 transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary" onClick={()=> router.push('/')}>Back to home</button>
      </div>
    </div>
  );
};

export default PaymentFailed;

