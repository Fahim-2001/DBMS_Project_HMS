"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import bycrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const VerifyUser = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //   Function to resend a new OTP
  const handleResendOTP = async () => {
    try {
      // User info from localstorage
      const user = JSON.parse(window.localStorage.getItem("user"));

      //   Request for new OTP [POST]
      const otpCredentials = await fetch(`http://localhost:3000/api/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => res.json());

      //   Saving new credentials into localstorage
      window.localStorage.setItem(
        "verification-credentials",
        JSON.stringify(otpCredentials)
      );

      toast.success("OTP sent to your mail.", {position:'top-center', autoClose:500})
      router.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  //   Function to verify user
  const handleVerify = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      // User and OTP info from localstorage
      const user = JSON.parse(window.localStorage.getItem("user"));
      const verificationCredentials = JSON.parse(
        window.localStorage.getItem("verification-credentials")
      );
      console.log(user, "\n", verificationCredentials);

      const enteredCode =
        e.target.a.value +
        e.target.b.value +
        e.target.c.value +
        e.target.d.value +
        e.target.e.value +
        e.target.f.value;

      if (await bycrypt.compare(enteredCode, verificationCredentials?.code)) {
        if (Date.now() < verificationCredentials?.expirationTimeMilliSec) {
          // POST method to send user data to db
          const res = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          router.refresh();
          setError("");

          if (res.ok) {
            await signIn("credentials", {
              email: user?.email,
              password: user?.password,
              redirect: false,
            });
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("verification-credentials");
            router.replace("/");
          }
        } else {
          setError("OTP Expired. Please Request for a new OTP");
        }
      } else {
        setError("OTP didn't match");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center my-10">
      <p className="text-3xl font-bold">Enter OTP Here</p>
      <form
        action=""
        className="my-5"
        onSubmit={handleVerify}
        autoComplete="off"
      >
        <div className="flex justify-center">
          <input
            type="text"
            required
            name="a"
            className="input input-bordered mx-2 w-12"
          />
          <input
            type="text"
            required
            name="b"
            className="input input-bordered mx-2 w-12"
          />
          <input
            type="text"
            required
            name="c"
            className="input input-bordered mx-2 w-12"
          />
          <input
            type="text"
            required
            name="d"
            className="input input-bordered mx-2 w-12"
          />
          <input
            type="text"
            required
            name="e"
            className="input input-bordered mx-2 w-12"
          />
          <input
            type="text"
            required
            name="f"
            className="input input-bordered mx-2 w-12"
          />
        </div>
        {error && <small className="text-red-600 mt-1">{error}</small>}
        <p className="my-2">
          We have emailed you an One Time Password.
          <span className="mx-2">Enter that OTP here to verify yourself.</span>
        </p>
        
        <p className="mb-3">
          Didn't you get OTP?
          <span
            type="submit"
            className="text-blue-600 mx-1 hover:cursor-pointer"
            onClick={async () => await handleResendOTP()}
          >
            Resend it.
          </span>
        </p>
        {loading ? (
          <button
            disabled
            className="px-8 py-2.5 leading-5 text-white font-semibold transition-colors duration-300 transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
          >
            Verifying{" "}
            <span className="loading loading-spinner loading-xs mx-2"></span>
          </button>
        ) : (
          <button
            type="submit"
            className="px-8 py-2.5 leading-5 text-white font-semibold transition-colors duration-300 transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
          >
            Verify
          </button>
        )}
      </form>
    </div>
  );
};

export default VerifyUser;
