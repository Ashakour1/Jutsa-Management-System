import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";
import Signup from "@/pages/Signup";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    { 
      path:"/dashboard",element:<DashboardLayout/>,
      children:[
        { index:"/", element:<Dashboard/>},
        // { path:"/dashboard/sports", },
        // { path:"/dashboard/sports/create", },
        // { path:"/dashboard/sports/:id",},
      ],
    },
    {
      path:"/",element:<Signup/>
    },
    {
      path:"/login",element:<Signup/>
    },
    {
      path:"*",element:<NotFound/>
    },
]);