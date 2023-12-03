import Link from "next/link";
import React from "react";

const ShowLabReports = async () => {
  const labTestRequests = await fetch(`${process.env.NEXT_PUBLIC_URL}api/labtests`, {
    cache: "no-store",
  }).then((res) => res.json());
  return (
    <div>
      <div className="text-xs">
        <div className="flex justify-between font-semibold mr-3">
          <p>Lab Test's Report Table</p>
          <p>Total Count :{labTestRequests.length}</p>
        </div>
        <div className="overflow-x-auto overflow-y-auto">
          <table className="table table-xs ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Contact Number</th>
                <th>Number of tests</th>
                <th>Tests</th>
                <th>Payable Amount</th>
                <th>Paid Ammount</th>
      
                <th>Lab Report</th>
              </tr>
            </thead>
            <tbody>
              {labTestRequests?.map((request) => (
                <tr key={request?.id}>
                  <td>{request?.id}</td>
                  <td>{request?.fullname}</td>
                  <td>{request?.email}</td>
                  <td>{request?.gender}</td>
                  <td>{request?.contact}</td>
                  <td>{request?.number_of_tests}</td>
                  <td>
                    {JSON.parse(request?.tests).map((test) => (
                      <div key={test?.id}>
                        <p>{test?.test}</p>
                      </div>
                    ))}
                  </td>
                  <td>{request?.payable_amount}</td>
                  <td>{request?.advanced_amount}</td>
                  
                  {request?.report_status ==="On Process" ? <td>
                    <Link
                      href={`/dashboard/labreports/${request?.id}`}
                      className="mx-1 mb-2 bg-primary hover:bg-secondary text-white font-semibold px-[8px] py-[3px] rounded-xl"
                    >
                      Upload
                    </Link>
                  </td> : <td>Uploaded</td>}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Contact Number</th>
                <th>Number of tests</th>
                <th>Tests</th>
                <th>Payable Amount</th>
                <th>Paid Ammount</th>
      
                <th>Lab Report</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowLabReports;
