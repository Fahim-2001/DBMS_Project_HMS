import React from "react";
import TestPaymentStatusUpdate from "./TestPaymentStatusUpdate";

const ShowLabTestRegistrations = async () => {
  const labTestRequests = await fetch(
    "http://localhost:3000/api/labtests",
    { cache: "no-store" }
  ).then((res) => res.json());

  // console.log(labTestRequests);
    
  return (
    <div className="text-xs mt-2">
      <div className="flex justify-between font-semibold mr-3">
        <p>Registered Lab Test's Table</p>
        <p>Total Count :{labTestRequests.length}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs mt-2">
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
              <th>Payment Status</th>
              <th>Report Status</th>
              <th>Registered By</th>
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
                <td><TestPaymentStatusUpdate request={request}/></td>
                <td>{request?.report_status}</td>
                <td>{request?.registered_by}</td>
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
              <th>Payment Status</th>
              <th>Report Status</th>
              <th>Registered By</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ShowLabTestRegistrations;
