import React from 'react'

import runningUsersAppts from '../../ProfileComponents/runningUsersAppts/runningUsersAppts'

export const metadata ={
    title: "Your Booked Appointments - PHP Hospital"
}
const page = () => {
  return (
    <div><runningUsersAppts/></div>
  )
}

export default page