import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("logout");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("id");
    window.dispatchEvent(new Event("userUpdated"));
    navigate("/login");
  });

  return <>Loging out...</>;
}
