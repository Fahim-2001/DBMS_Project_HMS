import React from 'react'
import ShowVaccineReqs from '../../DashboardComponents/ShowVaccineReqs/ShowVaccineReqs'

export const metadata ={
    title: "Vaccine Requests - PHP Hospital"
  }
const VaccineRequests = () => {
  return (
    <div>
        <ShowVaccineReqs/>
    </div>
  )
}

export default VaccineRequests