import React from "react";

export const GetInTouch = () => {
  return (
    <section className="my-5">
      <div>
        <h1 className="text-center text-3xl lg:text-4xl text-primary font-bold px-2 py-3 my-2 drop-shadow-md">
          Get In Touch
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mx-[10%] justify-items-center lg:items-center">
        <div>
            MAP
        </div>
        <div className="text-right text-xl text-gray-800 font-semibold">
            <p>Contact : +8801325678923</p>
            <p>E-mail: hospital@php.health.bd</p>
            <p>Location : Nayanagar, Baridhara J-Block, Gulshan, Dhaka,</p>
        </div>
      </div>
    </section>
  );
};
