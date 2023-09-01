import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function User() {
  const { users, fetchUserData } = useContext(UserContext);

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log(users);
  return <div></div>;
}
