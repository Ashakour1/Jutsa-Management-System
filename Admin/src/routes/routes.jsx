import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import NotFound from "@/pages/not-found";
import Header from "@/components/Navigations/Header";
import Finance from "@/pages/Finance";
import Sports from "@/pages/Sports";
import FinanceForm from "@/components/FinanceForm"; 
import SportsForm from "@/components/SportForm";
export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Header />, 
    children: [
      {
        index: true,
        element: <Dashboard />, 
      },
      {
        path: "finance", 
        element: <Finance />,
      },
      {
        path: "finance/manage", 
        element: <FinanceForm />,
      },
      {
        path: "finance/manage/:id", 
        element: <FinanceForm />,
      },
      {
        path: "sports", 
        element: <Sports />,
      },
      {
        path: "sports/manage", 
        element: <SportsForm />,
      },{
        path: "sports/manage/:id", 
        element: <SportsForm />,
      },
      {
        path: "*", 
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
