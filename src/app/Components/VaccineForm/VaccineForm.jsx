"use client";
import React from "react";
import { useForm } from "react-hook-form";

const VaccineForm = ({ vaccine }) => {
  const { register, handleSubmit } = useForm();
//   console.log(vaccine)
  const onSubmit = (vaccineHolder) => {
    vaccineHolder['vaccine_name'] = vaccine?.vaccineName;
    vaccineHolder['shortname'] = vaccine?.routename;
    console.log(vaccineHolder);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-lg text-sm"
            {...register("fullname")}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-lg text-sm"
            {...register("age")}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <select
              className="input input-bordered input-sm w-full max-w-lg text-sm"
              {...register("gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>   
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Contact Number</span>
          </label>
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-lg text-sm"
            {...register("contact")}
          />
        </div>
        
        <button
          type="submit"
          className="my-3 px-8 py-2.5 leading-5 text-white font-semibold transition-colors duration-300 transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VaccineForm;
