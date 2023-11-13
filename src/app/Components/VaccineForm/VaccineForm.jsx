"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import { generateVaccineTicket } from "@/app/utils/generateVaccineTicket";
import { useRouter } from "next/navigation";
import React, { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const VaccineForm = ({ vaccine }) => {
  const {runningUser} = useContext(UserDataContext);
  const formRef = useRef();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  //   console.log(vaccine)
  const onSubmit = async (vaccineHolder) => {
    
    vaccineHolder["vaccine_name"] = vaccine?.vaccineName;
    vaccineHolder["shortname"] = vaccine?.routename;
    vaccineHolder['status']= "Pending";

    try {
      const response = await fetch("http://localhost:3000/api/vaccineforms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vaccineHolder),
      });

      const vaccineInfo = await response.json();

      generateVaccineTicket(vaccineInfo)

      router.refresh();

      if (response.ok) {
        toast.success("Vaccine booking successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // formRef.current.reset()
      } else {
        toast.warning("Vaccine booking failed!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="mx-auto" ref={formRef}>
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
            type="number"
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

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-lg text-sm"
            defaultValue={runningUser?.email}
            {...register("email")}
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
