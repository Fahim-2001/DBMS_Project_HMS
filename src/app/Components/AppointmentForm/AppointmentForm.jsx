"use client";
import React from "react";
import { useForm } from "react-hook-form";

const AppointmentForm = ({ doctor }) => {
  const { register, handleSubmit } = useForm();

  console.log(doctor);

  const onSubmit = (patient) => {};
  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 capitalize">
        Appointment Form
      </h2>

      <form className="text-xs" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700" for="fullname">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_name")}
            />
          </div>

          <div>
            <label className="text-gray-700 " for="age">
              Age
            </label>
            <input
              id="age"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_age")}
            />
          </div>

          <div>
            <label className="text-gray-700 " for="gender">
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
            <label className="text-gray-700 " for="contact">
              Contact Number
            </label>
            <input
              id="contact"
              type="tel"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_contact")}
            />
          </div>

          <div>
            <label className="text-gray-700 " for="address">
              Address
            </label>
            <input
              id="address"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("patient_address")}
            />
          </div>

          <div>
            <label className="text-gray-700 " for="department">
              Department
            </label>
            <input
              id="department"
              type="text"
              readOnly
              defaultValue={doctor[0]?.speciality}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("department")}
            />
          </div>

          <div>
            <label className="text-gray-700 " for="ref_doctor">
              Reference Doctor
            </label>
            <input
              id="ref_doctor"
              type="text"
              readOnly
              defaultValue={doctor[0]?.first_name}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("ref_doctor")}
            />
          </div>

          <div>
            <label className="text-gray-700 " for="appointment_type">
              Appointment Type
            </label>
            <input
              id="appointment_type"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              {...register("appointment_type")}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default AppointmentForm;
