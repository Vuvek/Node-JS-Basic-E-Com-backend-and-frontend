import React, { useEffect, useLayoutEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const userData = localStorage.getItem("userData");
  if (!userData) {
    return <Navigate to={"/signup"} />;
  }
  return <Outlet />;
};

export default Protected;
