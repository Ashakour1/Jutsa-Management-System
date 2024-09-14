import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";
import Header from "@/components/Navigations/Header";
import Finance from "@/pages/Finance";
import Sports from "@/pages/Sports";
import FinanceForm from "@/components/FinanceForm"; 
import SportsForm from "@/components/SportForm";
export const router = createBrowserRouter([
  {
<<<<<<< HEAD
    path: "/",
    element: <Header />, // This will render the Header
    children: [
      {
        path: "/dashboard", // This will match the /dashboard path
        element: <Dashboard />, // This will render Dashboard inside Header
      },
      {
        path: "/dashboard/finance", // This will match /dashboard/finance
        element: <Finance />,
      },
      {
        path: "/dashboard/sports", // This will match /dashboard/sports
=======
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
>>>>>>> ccec6920188afc6060bb699c9c2cbba90af0e140
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
