import React from "react";
import CurrentUsersLabReports from "../../ProfileComponents/CurrentUsersLabReports/CurrentUsersLabReports";

const page = async () => {
  const labReports = await fetch(`http://localhost:3000/api/labtests`, {cache:'no-store'}).then(
    (res) => res.json()
  );
  return (
    <div>
      <CurrentUsersLabReports />
    </div>
  );
};

export default page;
