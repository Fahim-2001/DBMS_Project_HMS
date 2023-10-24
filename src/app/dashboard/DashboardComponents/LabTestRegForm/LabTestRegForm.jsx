"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const LabTestRegForm = () => {
  const { register, handleSubmit } = useForm();
  const [numberOfTests, setNumberOfTests] = useState(0);
  const [textFields, setTextFields] = useState([]);
  console.log(numberOfTests);

  const handleNumChange = (event) => {
    const newNum = parseInt(event.target.value, 10);
    setNumberOfTests(newNum);
    // Create an array of input fields based on the new number
    const newFields = Array.from({ length: newNum }, (_, i) => `Test${i + 1}`);
    setTextFields(newFields);
  };

  const onSubmit = (data) => {
    data.number_of_tests = numberOfTests;
    
    console.log(data);
  };

  const options=[
    {
        "id":1,
        "test": "A",
        "price": 500,
    },
    {
        "id":2,
        "test": "B",
        "price": 1000,
    },
    {
        "id":3,
        "test": "C",
        "price": 1500,
    },
    {
        "id":4,
        "test": "D",
        "price": 2000,
    },
  ]

  return (
    <div className="text-xs">
      <p className="font-medium">Lab Test Registration Form</p>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap">
          <div className="my-1">
            <label className="mr-1">Full Name</label>
            <br />
            <input
              required
              type="text"
              className="border border-primary mr-2"
              {...register("fullname")}
            />
          </div>

          <div className="my-1">
            <label className="mr-1">Age</label>
            <br />
            <input
              required
              type="number"
              className="border border-primary mr-2"
              {...register("age")}
            />
          </div>

          <div className="my-1">
            <label className="mr-1">Contact</label>
            <br />
            <input
              required
              type="text"
              className="border border-primary mr-2"
              {...register("contact")}
            />
          </div>

          <div className="my-1">
            <label className="mr-1">Email</label>
            <br />
            <input
              type="email"
              className="border border-primary mr-2"
              {...register("email")}
            />
          </div>

          <div className="my-1">
            <label className="mr-1">Number of Tests</label>
            <br />
            <input
              required
              type="number"
              min={0}
              value={numberOfTests}
              className="border border-primary mr-2"
              {...register("number_of_tests")}
              onChange={handleNumChange}
              
            />
          </div>

          {textFields.map((fieldName) => (
            <div className="my-1" key={fieldName}>
              <label className="mr-1">{fieldName}</label>
              <br />
              <select
                required
                type="text"
                className="border border-primary mr-2"
                {...register(`${fieldName}`)}
              >
                {
                    options.map((option)=>(
                        <option value={option}key={option.id}>{option.test}</option>
                    ))
                }
              </select>
            </div>
          ))}
        </div>
        {numberOfTests > 0 && (
          <button
            type="submit"
            className="mx-1 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
          >
            Add Test Request
          </button>
        )}
      </form>
    </div>
  );
};

export default LabTestRegForm;
