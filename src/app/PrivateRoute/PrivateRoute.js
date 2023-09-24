"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  if (session?.data?.user) {
    return children;
  }

  return router.replace('/signin');
};

export default PrivateRoute;
