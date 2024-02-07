import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

// we can alo name it privateRoute
function PrivateComponent() {
  const auth = localStorage.getItem("token");

  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateComponent;
