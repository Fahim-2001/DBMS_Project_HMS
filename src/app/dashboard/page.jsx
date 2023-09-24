import React from "react";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const Dashboard = () => {
  return (
    <PrivateRoute>
      <div>Welcome to Dashboard</div>
    </PrivateRoute>
  );
};

export default Dashboard;
