import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import NotFound from "@/pages/not-found";
import Header from "@/components/Navigations/Header";
import Finance from "@/pages/Finance";
import Sports from "@/pages/Sports";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Header />, // This will render the Header
    children: [
      {
        index: true, // This will match the /dashboard path
        element: <Dashboard />, // This will render Dashboard inside Header
      },
      {
        path: "finance", // This will match /dashboard/finance
        element: <Finance />,
      },
      {
        path: "sports", // This will match /dashboard/sports
        element: <Sports />,
      },
      {
        path: "*", // This will catch all routes under /dashboard that don't match any of the above
        element: <NotFound />,
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
  {
    path: "*",
    element: <NotFound />,
  },
]);
