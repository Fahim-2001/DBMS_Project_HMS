import React from "react";
import { allUsersData } from "@/app/Contexts/AllUsers/AllUsers";

export const metadata = {
  title: "Users - Dashboard",
};
const Users = async () => {
  const users = JSON.parse(allUsersData);

  
  return (
    <div className="overflow-x-auto">
      <div className='flex justify-between text-xs font-semibold mr-3'>
      <p >Users Table</p>
      <p>Total Count :{users.length}</p>
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
          {users?.map((user) => (
            <tr id={user?.id}>
              <th>{user?.id}</th>
              <td>{user?.fullname}</td>
              <td>{user?.email}</td>
              <td>{user?.gender}</td>
              <td>{user?.createdAt}</td>
              <td>{user?.userRole}</td>
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

export default Users;
