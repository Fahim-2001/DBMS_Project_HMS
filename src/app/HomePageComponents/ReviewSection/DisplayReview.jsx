"use client";
import { Carousel } from "flowbite-react";
import React, { useEffect } from "react";
import useSWR from "swr";

const DisplayReview = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // Single user fetching By email.
  const {
    data: reviews,
    error,
    isLoading,
  } = useSWR(`http://localhost:3000/api/reviews`, fetcher);

  console.log(reviews);
  return (
    <div className="mx-auto h-72 w-4/5 md:w-1/2 mb-24">
      <h1 className="text-center text-3xl lg:text-4xl text-primary font-bold px-2 py-3 mt-3 -mb-10 drop-shadow-md">
        Reviews
      </h1>
      <Carousel slide={true} indicators={false} slideInterval={2000}>
        {reviews?.map((rev) => (
          <div key={rev?.rev_id} className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg ">
            <div className="flex justify-center -mt-16">
              <img
                className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full "
                src={
                  "https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
                }
              />
            </div>

            <h2 className="mt-2 text-xl text-center font-semibold text-gray-800  md:mt-3">
              {rev?.name}
            </h2>

            <div className="mt-2 text-xs md:text-sm text-gray-600 ">
              <hr className="my-2" />
              <p>
                {rev?.comment}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DisplayReview;
