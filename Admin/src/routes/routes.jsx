import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import Header from "@/components/Navigations/Header";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Header />, // This will render the Header
    children: [
      {
        index: true, // This will match the /dashboard path
        element: <Dashboard />, // This will render Dashboard inside Header
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
