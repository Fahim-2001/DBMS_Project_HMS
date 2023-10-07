import React from "react";
import DeleteDoctor from "../DeleteDoctor/DeleteDoctor";

const ShowDoctors = async () => {
  // Calling all users data
  const doctors = await fetch("http://localhost:3000/api/doctors", {
    cache: "no-store",
  }).then((res) => res.json());
//   console.log(doctors);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between text-xs font-semibold mr-3">
        <p>Doctors Table</p>
        <p>Total Count :{doctors.length}</p>
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Registered In</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {doctors?.map((doctor) => (
            <tr key={doctor?.id}>
              <th>{doctor?.id}</th>
              <td>{doctor?.first_name}</td>
              <td>{doctor?.email}</td>
              <td>{doctor?.gender}</td>
              <td>{doctor?.createdAt}</td>
              <td>{doctor?.role}</td>
              <td>
                <DeleteDoctor doctor={doctor} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Registered In</th>
            <th>Role</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ShowDoctors;
