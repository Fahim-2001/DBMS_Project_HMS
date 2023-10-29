"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UploadPrescription = ({ appointment }) => {
  const router = useRouter();
  const [prescription, setPrescription] = useState("");
  const [testPreferences, setTestPreferences] = useState("");
  console.log(appointment[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const data = {
        appt_status: "Checked",
        prescription,
        test_preferences: testPreferences,
      };
      console.log(data);

      const response = await fetch(
        `http://localhost:3000/api/appointments/${appointment[0]?.appt_id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      router.refresh();

      if (response.ok) {
        toast.success("Prescription Uploaded", {
          position: "top-right",
          autoClose: 1000,
        });
      } else {
        toast.warning("Prescription Upload Failed", {
          position: "top-right",
          autoClose: 1000,
        });
        form.reset();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Patient Name:</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={appointment[0]?.patient_name}
              readOnly
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Patient Age:</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={appointment[0]?.patient_age}
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Patient Gender:</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={appointment[0]?.patient_gender}
              readOnly
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Appointment Type:</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={appointment[0]?.appt_type}
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Patient Issue:</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={appointment[0]?.patient_issue}
              readOnly
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Appointment Date:</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={appointment[0]?.appt_date}
              readOnly
            />
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Prescription</span>
          </label>
          <textarea
            id=""
            className="input input-bordered input-sm w-full text-sm"
            cols="30"
            rows="10"
            onChange={(e) => setPrescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Test Preferences</span>
          </label>
          <textarea
            id=""
            className="input input-bordered input-sm w-full text-sm"
            cols="30"
            rows="10"
            onChange={(e) => setTestPreferences(e.target.value)}
          ></textarea>
        </div>
        <button className="mx-2 my-3 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl">
          Update
        </button>
      </form>
    </div>
  );
};

export default UploadPrescription;
