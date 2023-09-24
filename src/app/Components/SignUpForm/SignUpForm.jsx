"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const SignUpForm = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [confirmedPassword, setConfirmedPassword] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // Function which triggers on every selection and display the instant change in UI.
  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

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
      // Digging out image file object from the form elements.
      const fileInput = Array.from(form.elements).find(
        ({ name }) => name === "file"
      );
      const imageFile = fileInput.files[0];

      // Processing the imageFile into FormData to send in cloudinary
      const formData = new FormData();
      formData.set("file", imageFile);

      // Form data set to cloudinary unsigned preset to prevent unsigned error into regarding preset 'phphospital-user-uploads'
      formData.append("upload_preset", "phphospital-user-uploads");

      // POSTing formdata to the cloudinary
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dqvsc6e7e/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((res) => res.json());
      setImageSrc(data.secure_url);

      // User information
      const user = {
        name: fullname,
        email: email,
        password: password,
        userImage: data.secure_url,
      };

      // Api call to get existing user with same email
      const existUserRes = await fetch("api/userExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });
      const existingEmail = await existUserRes.json();

      // Existing Email check
      if (existingEmail == email) {
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
        setImageSrc("");
        setError("");
        toast.success('Registration Successful!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          router.push('/');
      } else {
        console.log("User registration failed! ");
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
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400  sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {imageSrc && <img src={imageSrc} alt="User Profile Picture" className="h-24 w-24"/>}

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image
            </label>
            <div className="mt-2">
              <input
                id="image"
                name="file"
                type="file"
                className="block file-input file-input-primary file-input-sm w-full"
                onChange={handleOnChange}
              />
            </div>
            <span className="text-xs">Please provide image less than 1MB.</span>
          </div>

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
