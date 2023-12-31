"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (res.error) {
        if (
          res.error == "Cannot read properties of undefined (reading 'email')"
        ) {
          setError("Invalid Email");
        } else {
          setError(res.error);
        }
        return;
      }

      setError("");
      router.replace("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/forgot-password`,
        {
          method: "PUT",
          body: JSON.stringify(email),
        }
      );

      if (res.ok) {
        toast.success(`We have sent you an email with new password`, {
          autoClose: 1000,
          position: "top-center",
        });
      } else {
        toast.warning("Please check email you entered!", {
          autoClose: 1000,
          position: "top-center",
        });
      }
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
          Sign in to your account
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

          <div>
            <label
              htmlFor="password"
              className="flex justify-between text-sm font-medium leading-6 text-gray-900"
            >
              <span>Password</span>
              {loading ? (
                <span className="loading loading-spinner loading-xs text-primary"></span>
              ) : (
                <span className="text-primary" onClick={handleForgotPassword}>
                  Forgot Password?
                </span>
              )}
            </label>

            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Sign in
            </button>
            <p className="text-sm py-2 text-right">
              Don't have any account?{" "}
              <Link
                href={"/signup"}
                className="font-semibold text-primary hover:text-secondary"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
