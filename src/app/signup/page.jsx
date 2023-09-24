import React from 'react'
import { SignUpForm } from '../Components/SignUpForm/SignUpForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOption } from '../api/auth/[...nextauth]/route'


const SignUp = async() => {
  const session = await getServerSession(authOption);

  if(session) redirect("/");

  return (
    <div><SignUpForm></SignUpForm></div>
  )
}
export default SignUp;