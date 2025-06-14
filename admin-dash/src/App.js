import React, { lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import checkAuth from "./app/auth";
import initializeApp from "./app/init";
import { Toaster } from "react-hot-toast";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Documentation = lazy(() => import("./pages/Documentation"));

// Initializing different libraries
// initializeApp();

// Check for login and initialize axios
// const token = checkAuth();

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          {/* <Route path="/add" element={<AddFinance/>} /> */}

          {/* <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/login"} replace />}/> */}

          {/* Default Route - If no route matches */}
          <Route path="*" element={<Navigate to={"/login"} replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
