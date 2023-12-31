"use client";
import { useSession } from "next-auth/react";
import React, { createContext } from "react";
import useSWRImmutable from "swr/immutable";

export const UserDataContext = createContext();
const UserDataProvider = ({ children }) => {
  const session = useSession();
  const email = session?.data?.user?.email;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // Single user fetching By email.
  const {
    data: runningUser,
    error,
    isLoading,
  } = useSWRImmutable(
    `${process.env.NEXT_PUBLIC_URL}api/users/${email}`,
    fetcher
  );
  // console.log(runningUser);

  const values = {
    runningUser,
  };

  return (
    <UserDataContext.Provider value={values}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
