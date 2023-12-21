import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { VandorList } from "./../components/VandorList";
import { HomePage } from "../Pages/HomePage";
import { PrivateRoute } from "./PrivateRoute";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/vendor"
        element={
          <PrivateRoute>
            <VandorList />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
