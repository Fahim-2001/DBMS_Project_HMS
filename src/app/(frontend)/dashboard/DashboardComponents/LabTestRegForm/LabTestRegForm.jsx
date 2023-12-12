"use client";
import { UserDataContext } from "@/app/(frontend)/Contexts/UserDataProvider/UserDataProvider";
import { generateTestsInvoice } from "@/app/(frontend)/utils/generateTestsInvoice";
import { useRouter } from "next/navigation";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LabTestRegForm = () => {
  const { runningUser } = useContext(UserDataContext);
  const { register, handleSubmit } = useForm();
  const [numberOfTests, setNumberOfTests] = useState(0);
  const [textFields, setTextFields] = useState([]);
  const [labData, setLabData] = useState([]);
  const [payableAmount, setPayableAmount] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [advancedAmount, setAdvancedAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formRef = useRef();

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
    data["registered_by"] = runningUser?.fullname;
    data["registers_email"] = runningUser?.email;

    // Process of payable amount
    data.tests.map((test) => {
      payable = payable + test?.price;
    });

    setPayableAmount(payable);
    data["payable_amount"] = payable;
    setLabData(data);
  };

  const confirmRegistration = async () => {
    setLoading(true);
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
    labData.report_status = "On Process";
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/labtests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(labData),
      });
      router.refresh();
       
      const responseData = await response.json();
      // console.log(responseData?.unique_id)
      if (response.ok) {
        toast.success("Test Registered", {
          position: "top-right",
          autoClose: 500,
        });
        generateTestsInvoice(responseData?.unique_id);
        // formRef.current.reset();

      } else {
        toast.warning("Test Registration Failed", {
          position: "top-right",
          autoClose: 500,
        });
      }
    } catch (error) {
      console.log(error.message)  
    } finally {
      setLoading(false);
      setNumberOfTests(0);
      setTextFields([])
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
    (runningUser?.userRole == "super-admin" ||
      runningUser?.userRole === "receptionist") && (
      <div className="text-xs">
        <p className="font-semibold">Lab Test Registration Form</p>
        {/* Lab Test Registration Form */}
        <form action="" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap">
            <div className="my-1">
              <label className="mr-1">Full Name</label>
              <br />
              <input
                required
                type="text"
                className="border border-primary mr-2 p-1 rounded"
                {...register("fullname")}
              />
            </div>

            <div className="my-1">
              <label className="mr-1">Age</label>
              <br />
              <input
                required
                type="number"
                className="border border-primary mr-2 p-1 rounded"
                {...register("age")}
              />
            </div>

            <div className="my-1">
              <label className="mr-1">Gender </label>
              <br />
              <select
                required
                className="border border-primary mr-2 p-1 rounded px-[4px]"
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
                className="border border-primary mr-2 p-1 rounded"
                {...register("contact")}
              />
            </div>

            <div className="my-1">
              <label className="mr-1">Email</label>
              <br />
              <input
                required
                type="email"
                className="border border-primary mr-2 p-1 rounded"
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
                className="border border-primary mr-2 p-1 rounded"
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
                  className="border border-primary mr-2 p-1 rounded"
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
                  className="border border-primary mr-2 p-1 rounded"
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
                    className="border border-primary mr-2 p-1 rounded"
                    onChange={(e) => setAdvancedAmount(e.target.value)}
                  />
                </div>
              )}
            </div>
            <button
              onClick={confirmRegistration}
              className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Confirm Registration"
              )}
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default LabTestRegForm;
