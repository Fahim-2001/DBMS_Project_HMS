"use client";
import { UserDataContext } from "@/app/Contexts/UserDataProvider/UserDataProvider";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const session = useSession();
  const user = useContext(UserDataContext);

  if (session?.data?.user) {
    return children;
  }

  return redirect('/signin');
};

export default ProtectedRoute;
