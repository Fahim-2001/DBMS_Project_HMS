"use client"
import React, { useState } from "react";

const AddDoctor = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit =(e)=>{
    e.preventDefault();
    if(!fullName || !email || !speciality || !department ){
      setError("Please fill all the fields!");
      return;
    }
    const doc = {
      fullName,
      email,
      speciality,
      department
    }
    console.log(doc);
    setError("")
  }

  return (
    <div>
      <p className="text-xs font-semibold mb-2">Add Doctor</p>
      <form method="post" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-xs mb-2">
            <label htmlFor="name" className="mr-2">
              Full Name:
            </label>
            <input
              name="name"
              type="text"
              className="border border-primary w-3/5"
              onChange={(e)=>setFullName(e.target.value)}
            />
          </div>
          <div className="text-xs mb-2">
            <label htmlFor="email" className="mr-2">
              Email:
            </label>
            <input
              name="email"
              type="email"
              className="border border-primary w-3/5"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="text-xs mb-2">
            <label htmlFor="speciality" className="mr-2">
              Speciality:
            </label>
            <input
              name="speciality"
              type="text"
              className="border border-primary w-3/5"
              onChange={(e)=>setSpeciality(e.target.value)}
            />
          </div>
          <div className="text-xs mb-2">
            <label htmlFor="department" className="mr-2">
              Department:
            </label>
            <input
              name="department"
              type="text"
              className="border border-primary w-3/5"
              onChange={(e)=>setDepartment(e.target.value)}
            />
          </div>
        </div>
        <div className="flex md:justify-between my-2 mx-0 lg:mx-6">
        <p className="text-xs text-red-600">{error}</p>
        <button type="submit" className="bg-primary hover:bg-secondary text-xs text-white font-semibold px-[8px] py-[3px] rounded-xl">Add Doctor</button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
