"use client"
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import React, { useContext } from "react";

const Users = () => {
  const {users} = useContext(UserDataContext)
  return (
    <div className="overflow-x-auto">
      {/* {data} */}
      <div className="flex justify-between text-xs font-semibold mr-3">
        <p>Users Table</p>
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
            <tr key={user?.id}>
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
