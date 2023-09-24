
import React from 'react'
import SignInForm from '../Components/SignInForm/SignInForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOption } from '../api/auth/[...nextauth]/route';

const SignIn = async() => {
  const session = await getServerSession(authOption);

  if(session) redirect("/");
  
  return (
    <div>
        <SignInForm></SignInForm>
    </div>
  )
}
export default SignIn;