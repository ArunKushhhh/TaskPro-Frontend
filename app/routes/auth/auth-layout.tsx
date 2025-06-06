import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <div className="wfull h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
