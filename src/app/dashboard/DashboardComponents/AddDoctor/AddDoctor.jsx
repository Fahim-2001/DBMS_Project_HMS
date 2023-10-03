import React from "react";

const AddDoctor = () => {
  return (
    <div>
      <p className="text-xs font-semibold mb-2">Add Doctor</p>
      <form action="" className="grid grid-cols-3">
        <div className="text-xs mb-2">
          <label htmlFor="name" className="mr-2">Full Name:</label>
          <input name="name" type="text" className="border border-primary "/>
        </div>
        <div className="text-xs mb-2">
          <label htmlFor="email" className="mr-2">Email:</label>
          <input name="email" type="email" className="border border-primary "/>
        </div>
        <div className="text-xs mb-2">
          <label htmlFor="speciality" className="mr-2">Speciality:</label>
          <input name="speciality" type="text" className="border border-primary "/>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
