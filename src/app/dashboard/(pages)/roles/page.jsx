"use client"
// import { allUsersData } from "@/app/Contexts/AllUsersInfoProvider/AllUsers";
import React, { useContext } from "react";
import RoleUpdate from "../../DashboardComponents/RoleUpdate/RoleUpdate";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";


const Roles = () => {
  // const users = JSON.parse(allUsersData);

  const {users} = useContext(UserDataContext)
  // console.log(users);
  return (
    <div className="overflow-x-auto">
      {/* <AllUsersInfoProvider/> */}
      <div className="flex justify-between text-xs font-semibold mr-3">
        <p>Role Table</p>
        <p>User Count :{users?.length}</p>
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Registered In</th>
            <th>Promote</th>
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
              <td>
                <RoleUpdate user={user}></RoleUpdate>
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
            <th>Promote</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Roles;
