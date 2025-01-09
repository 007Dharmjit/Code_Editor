// import React from 'react'
import { useAuth } from "../context/AuthContext";
const User = () => {
  const { userData } = useAuth();

  return (
    <>
      {userData ? (
        <div>
          <h2 className=" text-3xl text-zinc-700 font-bold  ">
            Welcome, {userData.username} !
          </h2>
          <p className=" text-2xl text-zinc-700 font-bold">
            Email: {userData.email}
          </p>
        </div>
      ) : (
        <h2 className=" text-3xl text-zinc-700 font-bold  ">
          Pleas Login
        </h2>
      )}
    </>
  );
};

export default User;
