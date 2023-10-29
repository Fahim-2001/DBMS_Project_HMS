import React from "react";
import DeleteUser from "../../DashboardComponents/DeleteUser/DeleteUser";

export const metadata = {
  title: "Users - PHP Hospital",
};
const Users = async () => {
  // Calling all users data
  const users = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  }).then((res) => res.json());

  // console.log("Users Page: ",users)
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
            <th>Id</th>
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
              <td>
                <DeleteUser user={user} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Id</th>
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
