"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

const ReviewSection = () => {
  const { handleSubmit, register } = useForm();
  const router = useRouter();
  const formRef = useRef()

  const onSubmit = async(data) =>{
    console.log(data)

    const response = await fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    router.refresh()

    if(response.ok){
        console.log("Success");
        formRef.current.reset()
    }else{
        console.log("failed")
    }
  }
  return (
    <div>
      <div>
        <h1 className="text-center text-3xl lg:text-4xl text-primary font-bold px-2 py-3 my-2 drop-shadow-md">
          Put Your Valueable Comments
        </h1>
      </div>
      <div className="">
      <form className="mx-32" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <div className="flex flex-col mb-3">
          <label className="text-gray-700 my-2" htmlFor="name">
            Your Name
          </label>
          <input
            id="name"
            type="name"
            placeholder="Type here"
            className="input input-bordered input-md w-full"
            {...register("name")}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="text-gray-700 my-2" htmlFor="email">
            Your Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Type here"
            className="input input-bordered input-md w-full"
            {...register("email")}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 my-2" htmlFor="comment">
            Your comment
          </label>
          <textarea
            id="comment"
            type="text"
            rows={30}
            cols={20}
            placeholder="Type here"
            className="input input-bordered input-md w-full h-[150px]"
            {...register("comment")}
            required
          />
        </div>
        <button
            type="submit"
            className="px-8 py-2.5 my-3 leading-5 text-white font-semibold transition-colors duration-300 transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
          >
            Submit
          </button>
      </form>
      </div>
    </div>
  );
};

export default ReviewSection;
