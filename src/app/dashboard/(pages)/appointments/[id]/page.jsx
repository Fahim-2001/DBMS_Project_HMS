import UploadPrescription from '@/app/dashboard/DashboardComponents/UploadPrescription/UploadPrescription'
import React from 'react'

const page = async({params}) => {
    const appointment = await fetch(`http://localhost:3000/api/appointments/${params.id}`,{cache:"no-store"}).then((res)=>res.json());
    
  return (
    <div><UploadPrescription appointment={appointment}/></div>
  )
}

export default page