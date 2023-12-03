import React from 'react'
import LabTestRegForm from '../../DashboardComponents/LabTestRegForm/LabTestRegForm'
import ShowLabTestRegistrations from '../../DashboardComponents/ShowLabTestRegistrations/ShowLabTestRegistrations'


const page = () => {
  return (
    <div>
        <LabTestRegForm/>
        <ShowLabTestRegistrations/>
    </div>
  )
}

export default page