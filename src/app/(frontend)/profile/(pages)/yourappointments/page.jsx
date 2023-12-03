import React from 'react'

import CurrentUsersAppts from '../../ProfileComponents/CurrentUsersAppts/CurrentUsersAppts'

export const metadata ={
    title: "Your Booked Appointments - PHP Hospital"
}
const page = () => {
  return (
    <div><CurrentUsersAppts/></div>
  )
}

export default page