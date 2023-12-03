import React from "react";
import UpdateVaccineStatus from "./UpdateVaccineStatus";

const ShowVaccineReqs = async () => {
  const vaccineRequests = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/vaccineforms`,
    { cache: "no-store" }
  ).then((res) => res.json());
//   console.log(vaccineRequests);
  return (
    <div className="overflow-x-auto">
        <div className="flex justify-between text-xs font-semibold mr-3">
        <p>Vaccine Requests Table</p>
        <p>Total Count :{vaccineRequests.length}</p>
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Vaccine</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vaccineRequests?.map((req) => (
            <tr key={req?.id}>
              <th>{req?.id}</th>
              <td>{req?.fullname}</td>
              <td>{req?.email}</td>
              <td>{req?.gender}</td>
              <td>{req?.contact}</td>
              <td>{req?.vaccine_name}</td>
              <td><UpdateVaccineStatus req={req}/></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Vaccine</th>
            <th>Status</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ShowVaccineReqs;
