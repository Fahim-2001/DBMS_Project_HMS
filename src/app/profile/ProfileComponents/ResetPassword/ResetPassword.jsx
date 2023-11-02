"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ResetPassword = ({ userId }) => {
  const router = useRouter();
  const formRef = useRef();
  const { register, handleSubmit } = useForm();

  const handleReset = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      router.refresh();

      if (response.ok) {
        toast.success("Password Reset Done", {
          position: "top-right",
          autoClose: 1000,
        });
        formRef.current.reset();
      } else {
        const res = await response.json();
        toast.warning(res.message, { position: "top-right", autoClose: 1000 });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="text-xs">
      <div>
        <p className="font-semibold">Reset Password?</p>
      </div>
      <form ref={formRef} action="" onSubmit={handleSubmit(handleReset)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="font-medium">Old Password</span>
            </label>
            <input
              className="input input-bordered input-sm w-full text-sm"
              {...register("old_pass")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-medium">New Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered input-sm w-full text-sm"
              {...register("new_pass")}
            />
          </div>
        </div>
        <div className="flex justify-end my-3">
          <button
            type="submit"
            className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-[10px] py-[4px] rounded-xl"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
