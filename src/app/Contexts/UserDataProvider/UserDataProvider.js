"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext();
const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const session = useSession();
  const email = session?.data?.user?.email;

  // Useffect to fetch data every time.
  useEffect(() => {
    if (email) {
      async function getData() {
        const existUser = await fetch("api/userExist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        },{cache : 'no-store'});
        const res = await existUser.json();

        setUserData(res);
      }

      getData();
    }
  }, [email]);
  //   console.log(userData);
  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
