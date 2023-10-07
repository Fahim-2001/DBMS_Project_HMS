import React from 'react'
import AddDoctor from '../../DashboardComponents/AddDoctor/AddDoctor'
import ShowDoctors from '../../DashboardComponents/ShowDoctors/ShowDoctors';

export const metadata = {
  title: "Add Doctors - PHP Hospital",
};
const Doctors = () => {
  return (
    <div>
      <AddDoctor></AddDoctor>
      <ShowDoctors></ShowDoctors>
    </div>
  )
}

export default Doctors