import React from 'react'
import CurrentUsersAppt from '../../ProfileComponents/CurrentUsersAppt/CurrentUsersAppt'

export const metadata ={
    title: "Your Booked Appointments - PHP Hospital"
}
const page = () => {
  return (
    <div><CurrentUsersAppt/></div>
  )
}

export default page