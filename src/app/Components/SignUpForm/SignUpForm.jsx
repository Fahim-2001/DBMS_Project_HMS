"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const SignUpForm = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [confirmedPassword, setConfirmedPassword] = useState(null);
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Password Visibility function
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function which complete all actions in Form.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      setLoading(true);
      // Error checking if there is correct information or not
      if (!fullname || !email || !password || !confirmedPassword) {
        setError("Please fill up all the required fields!");
        return;
      }

      // User information
      const user = {
        name: fullname,
        email: email,
        password: password,
        userRole: "user",
        gender: gender,
      };

      // Password Check
      if (password != confirmedPassword) {
        setError("Confirm Password not matched!");
        return;
      }

      const existingUser = await fetch(
        `http://localhost:3000/api/users/${user?.email}`,
        { cache: "no-store" }
      ).then((res) => res.json());
      // console.log(existingUser);

      // Checking whether an account exists or not with this email.
      if (existingUser?.email === email) {
        setError("An account exists with this email !");
        return;
      }

      // SEND OTP API
      const otpCredentials = await fetch(`http://localhost:3000/api/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => res.json());

      window.localStorage.setItem("user", JSON.stringify(user));
      window.localStorage.setItem(
        "verification-credentials",
        JSON.stringify(otpCredentials)
      );

      router.push("http://localhost:3000/signup/verification");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 my-3 md:mb-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="full name"
                name="fullname"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400  sm:text-sm sm:leading-6"
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400  sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <fieldset>
            <label
              htmlFor="gender"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Gender
            </label>
            <div className="flex justify-evenly">
              <div className="flex">
                <input
                  name="gender"
                  id="male"
                  type="radio"
                  value="male"
                  required
                  className="mr-2"
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>Male</span>
              </div>
              <div className="flex">
                <input
                  name="gender"
                  id="female"
                  type="radio"
                  value="female"
                  required
                  className="mr-2"
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>Female</span>
              </div>
            </div>
          </fieldset>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
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
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmedpassword"
                name="confirmedpassword"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <span className="text-red-500">{error}</span>}
          <div>
            {loading ? (
              <button
                disabled
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Sending OTP{" "}
                <span className="loading loading-spinner mx-2 loading-xs"></span>
              </button>
            ) : (
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Sign Up
              </button>
            )}
            <p className="text-sm py-2 text-right">
              Already have an account?{" "}
              <Link
                href={"/signin"}
                className="font-semibold text-primary hover:text-secondary"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
