"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const session = useSession();

  if (session?.data?.user) {
    return children;
  }

  return redirect("/signin");
};

export default ProtectedRoute;
