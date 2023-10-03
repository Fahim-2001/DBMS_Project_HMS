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

  const router = useRouter();
  // Function which complete all actions in Form.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Error checking if there is correct information or not
    if (!fullname || !email || !password || !confirmedPassword) {
      setError("Please fill up all the required fields!");
      return;
    }

    try {
      // User information
      const user = {
        name: fullname,
        email: email,
        password: password,
        userRole: "user",
        gender: gender,
      };

      // Api call to get existing user with same email
      const existUserResponse = await fetch("api/userExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });
      const existingUser = await existUserResponse.json();

      // Existing Email check
      if (existingUser.email == email) {
        setError("Email Exists!");
        return;
      }

      // Password Check
      if (password != confirmedPassword) {
        setError("Confirme Password not matched!");
        return;
      }

      // Api call to send user information into the db
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        form.reset();
        setError("");
        await signIn("credentials", {
          email: email,
          password: password,
          redirect: true,
        });

        toast.success("Registration Successful!", {
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
        toast.warning("Registration unuccessful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    } catch (error) {
      console.log(error.message);
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400  sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400  sm:text-sm sm:leading-6"
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
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <span className="text-red-500">{error}</span>}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Sign Up
            </button>
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
