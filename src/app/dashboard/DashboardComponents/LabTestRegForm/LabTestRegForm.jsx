"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import { Chela_One } from "next/font/google";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import JSXStyle from "styled-jsx/style";

const LabTestRegForm = () => {
  const { singleUser } = useContext(UserDataContext);
  const { register, handleSubmit } = useForm();
  const [numberOfTests, setNumberOfTests] = useState(0);
  const [textFields, setTextFields] = useState([]);
  // const [tests, setTests] = useState([]);

  // New field creating operation
  const handleNumChange = (event) => {
    const newNum = parseInt(event.target.value, 10);
    setNumberOfTests(newNum);
    // Create an array of input fields based on the new number
    const newFields = Array.from({ length: newNum }, (_, i) => `Test${i + 1}`);
    setTextFields(newFields);
  };

  // Adding test objects to an array
  let tests = [];
  const handleAddTests = (option) => {
    tests = [...tests, JSON.parse(option)];
  };

  const onSubmit = async (data) => {
    data.number_of_tests = numberOfTests;
    data["tests"] = tests;
    data["registered_by"] = singleUser?.fullname;
    data["registers_email"] = singleUser?.email;
    console.log(data);

    try {
      const response = await fetch(
        "http://localhost:3000/api/labtestrequests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Successs");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const options = [
    {
      id: 1,
      test: "ECG",
      price: 700,
    },
    {
      id: 2,
      test: "EEG",
      price: 650,
    },
    {
      id: 4,
      test: "MRI",
      price: 7000,
    },
    {
      id: 5,
      test: "Ultrasonography",
      price: 1000,
    },
  ];
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
            <label className="mr-1">Gender </label>
            <br />
            <select
              className="border border-primary mr-2 px-[4px]"
              {...register("gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="my-1">
            <label className="mr-1">Contact</label>
            <br />
            <input
              required
              type="tel"
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
            <div key={fieldName} className="my-1">
              <label className="mr-1">{fieldName}</label>
              <br />
              <select
                required
                type="text"
                className="border border-primary mr-2"
                onChange={(e) => handleAddTests(e.target.value)}
              >
                <option value="">Select Test</option>
                {options.map((option) => (
                  <option value={JSON.stringify(option)} key={option.id}>
                    {option?.test}
                  </option>
                ))}
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
