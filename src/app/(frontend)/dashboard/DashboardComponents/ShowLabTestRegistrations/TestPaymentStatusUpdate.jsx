"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const TestPaymentStatusUpdate = ({ request }) => {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false)

  const updateStatus = async () => {
    try {
      setLoading(true);
      const data = {
        due_ammount: 0,
        payment_status: status,
      };

      console.log(data)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/labtests/${request?.unique_id}`,
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
    }finally{
      setLoading(false)
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
        {loading? <span className="loading loading-spinner loading-xs"></span>: "Update"}
      </button>
    </div>
  ) : (
    <p>{request?.payment_status}</p>
  );
};

export default TestPaymentStatusUpdate;
