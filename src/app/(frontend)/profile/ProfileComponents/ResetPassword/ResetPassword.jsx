"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ResetPassword = ({ userId }) => {
  const router = useRouter();
  const formRef = useRef();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleReset = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/users/${userId}`,
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="text-xs mt-5">
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
            <label className="label flex justify-between items-center">
              <span className="font-medium">New Password</span>
              <div onClick={handlePasswordVisibility}>
                {showPassword == true ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </div>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered input-sm w-full text-sm"
              {...register("new_pass")}
            />
          </div>
        </div>
        <div className="flex justify-end my-3">
        {loading ? (
            <button
              disabled
              className="flex justify-center items-center mx-1 my-2 bg-primary hover:bg-secondary text-white font-semibold px-[10px] py-[4px] rounded-xl"
            >
              <span>Reset Password</span>
              <span className="loading loading-spinner loading-xs px-2 "></span>
            </button>
          ) : (
            <button
              type="submit"
              className="mx-1 my-2 bg-primary hover:bg-secondary text-white font-semibold px-[10px] py-[4px] rounded-xl"
            >
              Reset Password
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
