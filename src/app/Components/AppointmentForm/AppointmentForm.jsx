"use client";
import React, { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { generatePdf } from "./pdfGenerator";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";

const AppointmentForm = ({ doctor }) => {
  const {singleUser}=useContext(UserDataContext);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const formRef = useRef()
  // console.log(doctor);

  const onSubmit = async (patient) => {
    patient["doc_email"]= doctor?.email;
    patient["doc_id"] = doctor?.doc_id;
    patient["fee"] = 800;
    patient["appt_status"] = 'Unchecked';
    patient["ref_email"]= singleUser?.email;
    // console.log(patient);

    const response = await fetch("http://localhost:3000/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    });
    router.refresh();
    
    if (response.ok) {
      toast.success("Appointment booking successful!", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warning("Appointment booking failed!", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // Invoice Generation
    generatePdf(patient, doctor);

    formRef.current.reset()
  };

  
  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 capitalize">
        Appointment Form
      </h2>

      <form className="text-xs" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700" htmlFor="fullname">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_name")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="age">
              Age
            </label>
            <input
              id="age"
              type="number"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_age")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="gender">
              Gender{" "}
            </label>
            <br />
            <select
              id="gender"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="contact">
              Contact Number
            </label>
            <input
              id="contact"
              type="tel"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_contact")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="address">
              Address
            </label>
            <input
              id="address"
              type="text"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_address")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="department">
              Department
            </label>
            <input
              id="department"
              type="text"
              required
              readOnly
              defaultValue={doctor?.speciality}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("department")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="ref_doctor">
              Reference Doctor
            </label>
            <input
              id="ref_doctor"
              type="text"
              required
              readOnly
              defaultValue={doctor?.first_name+" "+doctor?.last_name}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("ref_doctor")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="appointment_type">
              Appointment Type
            </label>
            <select
              id="appointment_type"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("appt_type")}
            >
              <option value="new">New Appointment</option>
              <option value="revisit">Revisit</option>
            </select>
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="short_description">
              Describe your problem shortly
            </label>
            <textarea
              id="short_description"
              type="text"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("short_description")}
            />
          </div>

          <div>
            <label className="text-gray-700 " htmlFor="appt_date">
              Choose Date For Appointment
            </label>
            <input
              id="appt_date"
              type="date"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("appt_date")}
            />
            <p className="text-[10px] text-gray-500 ml-1">
              * Except government holiday
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-8 py-2.5 leading-5 text-white font-semibold transition-colors duration-300 transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
          >
            Confirm Appointment
          </button>
        </div>
      </form>
    </section>
  );
};

export default AppointmentForm;
