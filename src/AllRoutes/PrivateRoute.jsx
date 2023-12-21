import { useToast } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const toast = useToast();

  if (!token) {
    toast({
      title: "Login First",
      description: "You need to be registered.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    return <Navigate to="/" />;
  }
  return children;
};
