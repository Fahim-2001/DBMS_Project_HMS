"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const TestPaymentStatusUpdate = ({ request }) => {
  const router = useRouter();
  const [status, setStatus] = useState("");

  const updateStatus = async () => {
    // console.log(status, request?.id);
    try {
      const data = {
        due_ammount: 0,
        payment_status: status,
      };

      const response = await fetch(
        `http://localhost:3000/api/labtests/${request?.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      router.refresh();

      if (response.ok) {
        toast.success("Update Payment Status Success", {
          position: "top-right",
          autoClose: 1000,
        });
      } else {
        toast.warning("Update Payment Status Failed", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return request?.payment_status === "Due" ? (
    <div className="flex">
      <select onChange={(e) => setStatus(e.target.value)} className="px-2">
        <option defaultValue={request?.payment_status}>
          {request?.payment_status}
        </option>
        <option value="Due">Due</option>
        <option value="Paid">Paid</option>
      </select>
      <button
        className="mx-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
        onClick={updateStatus}
      >
        Update
      </button>
    </div>
  ) : (
    <button className="mx-2 bg-gray-400 text-white font-semibold px-[8px] py-[3px] rounded-xl">
      Updated
    </button>
  );
};

export default TestPaymentStatusUpdate;
