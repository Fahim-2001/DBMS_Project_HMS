
import React from 'react'

const DoctorAppointments = async({params}) => {
  const doctor = await fetch(`http://localhost:3000/api/doctor?doctor_id=${params.id}`, {cache:'no-store'}).then(res=>res.json());
  console.log("Doctor-",doctor)
  return (
    <div>{params.id}</div>
  )
}

export default DoctorAppointments