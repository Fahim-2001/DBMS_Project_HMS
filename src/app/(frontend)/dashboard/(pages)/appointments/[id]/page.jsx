import UploadPrescription from '@/app/frontend/dashboard/DashboardComponents/UploadPrescription/UploadPrescription'
import React from 'react'

const page = async({params}) => {
    const appointment = await fetch(`${process.env.NEXT_PUBLIC_URL}api/appointments/${params.id}`,{cache:"no-store"}).then((res)=>res.json());
    
  return (
    <div><UploadPrescription appointment={appointment}/></div>
  )
}

export default page