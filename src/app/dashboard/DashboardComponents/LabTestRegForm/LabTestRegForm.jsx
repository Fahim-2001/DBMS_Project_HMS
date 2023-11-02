"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const LabTestRegForm = () => {
  const { singleUser } = useContext(UserDataContext);
  const { register, handleSubmit } = useForm();
  const [numberOfTests, setNumberOfTests] = useState(0);
  const [textFields, setTextFields] = useState([]);
  const [labData, setLabData] = useState([]);
  const [payableAmount, setPayableAmount] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [advancedAmount, setAdvancedAmount] = useState(0);
  const router = useRouter();

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
    const parsedOption = JSON.parse(option);
    tests = [...tests, parsedOption];
  };

  // Getting Form Data for payment
  let payable = 0;
  const onSubmit = async (data) => {
    data.number_of_tests = numberOfTests;
    data["tests"] = tests;
    data["registered_by"] = singleUser?.fullname;
    data["registers_email"] = singleUser?.email;

    // Process of payable amount
    data.tests.map((test) => {
      payable = payable + test?.price;
    });

    setPayableAmount(payable);
    data["payable_amount"] = payable;
    setLabData(data);
  };

  const confirmRegistration = async () => {
    // Setting of Payment
    if (paymentMethod == "Due Payment") {
      const due = labData.payable_amount - advancedAmount;
      labData.advanced_amount = parseInt(advancedAmount);
      labData.due_amount = due;
      labData.payment_status = "Due";
    } else {
      labData.advanced_amount = labData.payable_amount;
      labData.due_amount = 0;
      labData.payment_status = "Paid";
    }
    labData.report_status = "On Process"
    try {
      const response = await fetch(
        "http://localhost:3000/api/labtests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(labData),
        }
      );
      router.refresh();
      
      if (response.ok) {
        console.log("Successs");
        // console.log(labData);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Test options
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
    singleUser?.userRole==="receptionist"&&<div className="text-xs">
      <p className="font-semibold">Lab Test Registration Form</p>
      {/* Lab Test Registration Form */}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap">
          <div className="my-1">
            <label className="mr-1">Full Name</label>
            <br />
            <input
              required
              type="text"
              className="border border-primary mr-2 px-1"
              {...register("fullname")}
            />
          </div>

          <div className="my-1">
            <label className="mr-1">Age</label>
            <br />
            <input
              required
              type="number"
              className="border border-primary mr-2 px-1"
              {...register("age")}
            />
          </div>

          <div className="my-1">
            <label className="mr-1">Gender </label>
            <br />
            <select
              className="border border-primary mr-2 px-1 px-[4px]"
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
              className="border border-primary mr-2 px-1"
              {...register("contact")}
            />
          </div>

          <div className="my-1">
            <label className="mr-1">Email</label>
            <br />
            <input
              type="email"
              className="border border-primary mr-2 px-1"
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
              className="border border-primary mr-2 px-1"
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
                className="border border-primary mr-2 px-1"
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
            className="mx-1 my-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
          >
            Proceed To Payment
          </button>
        )}
      </form>

      {/* Payment Method */}
      {numberOfTests > 0 && (
        <div>
          <div className="flex flex-wrap">
            <div className="my-5">
              <p>You have to pay: {payableAmount} BDT</p>
            </div>
            <div className="my-1 mx-2">
              <label className="mr-1">Payment Method</label>
              <br />
              <select
                className="border border-primary mr-2 px-1"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select Method</option>
                <option value="Full Payment">Full Payment</option>
                <option value="Due Payment">Due Payment</option>
              </select>
            </div>
            {paymentMethod == "Due Payment" && (
              <div className="my-1">
                <label className="mr-1">Advance Amount</label>
                <br />
                <input
                  required
                  type="number"
                  className="border border-primary mr-2"
                  onChange={(e) => setAdvancedAmount(e.target.value)}
                />
              </div>
            )}
          </div>
          <button
            onClick={confirmRegistration}
            className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
          >
            Confirm Registration
          </button>
        </div>
      )}
    </div>
  );
};

export default LabTestRegForm;
