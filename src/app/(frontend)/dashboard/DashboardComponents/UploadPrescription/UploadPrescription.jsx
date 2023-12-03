"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UploadPrescription = ({ appointment }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [prescription, setPrescription] = useState("");
  const [testPreferences, setTestPreferences] = useState("");
  // console.log(appointment);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    try {
      const data = {
        appt_status: "Checked",
        prescription,
        test_preferences: testPreferences,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/appointments/${appointment?.appt_id}`,
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
        form.reset();
        router.back()
      } else {
        toast.warning("Prescription Upload Failed", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    finally{
      setLoading(false);
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
              defaultValue={appointment?.patient_name}
              readOnly
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Patient Age:</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={appointment?.patient_age}
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
              defaultValue={appointment?.patient_gender}
              readOnly
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Appointment Type:</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={appointment?.appt_type}
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
              defaultValue={appointment?.patient_issue}
              readOnly
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Appointment Date:</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              defaultValue={appointment?.appt_date}
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
        {loading ? (
          <button
            disabled
            className="mx-2 my-3 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
          >
            <span className="loading loading-spinner loading-xs"></span>
          </button>
        ) : (
          <button
            type="submit"
            className="mx-2 my-3 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
          >
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default UploadPrescription;
