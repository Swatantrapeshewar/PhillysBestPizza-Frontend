import * as React from "react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/Forgot Password";
import ResetPassword from "../Pages/Reset Password";

const Router = () => {
  return (
    <Suspense fallback={null}> 
      <Routes>
            <Route
              path='/' 
              Component={Dashboard}
            />
            <Route
              path='/login' 
              Component={Login}
            />
            <Route
              path='/forgot-password' 
              Component={ForgotPassword}
            />
            <Route
              path='/reset-password' 
              Component={ResetPassword}
            />
            <Route
              path='/invite-user' 
              Component={Dashboard}
            />
      </Routes>
    </Suspense>
  );
};

export default Router;
