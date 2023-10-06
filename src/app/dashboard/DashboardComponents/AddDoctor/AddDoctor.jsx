"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddDoctor = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data.firstname);

  return (
    <div>
      <p className="text-xs font-semibold mb-2">Add Doctor</p>
      <form className="text-xs" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap">
          <div className="my-1">
            <label className="mr-1">First Name</label><br />
            <input
              className="border border-primary mr-2"
              {...register("firstname")}
            />
          </div>
          <div className="my-1">
            <label className="mr-1">Last Name</label><br />
            <input
              className="border border-primary mr-2"
              {...register("lastname")}
            />
          </div>
          <div className="my-1">
            <label className="mr-1">Email Address</label><br />
            <input
              className="border border-primary mr-2"
              {...register("email")}
            />
          </div>
          <div className="my-1">
            <label className="mr-1">Phone Number</label><br />
            <input
              className="border border-primary mr-2"
              {...register("phonenumber")}
            />
          </div>
          <div className="my-1">
            <label className="mr-1">Speciality</label><br />
            <input
              className="border border-primary mr-2"
              {...register("speciality")}
            />
          </div>
          <div className="my-1">
            <label className="mr-1">Gender </label><br />
            <select
              className="border border-primary mr-2 px-[4px]"
              {...register("gender")}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
        </div>
        <button className="mx-1 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
