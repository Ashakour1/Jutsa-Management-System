import DashboardLayout from "@/components/layout/DashboardLayout";
import Overview from "@/components/Overview";
import NotFound from "@/pages/not-found";
import Signup from "@/pages/Signup";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    { 
      path:"/dashboard",element:<DashboardLayout/>,
      children:[
        { index:"/", element:<Overview/>},
        { path:"/dashboard/sports", },
        { path:"/dashboard/sports/create", },
        { path:"/dashboard/sports/:id",},
      ],
    },
    {
      path:"/",element:<Signup/>
    },
    {
      path:"*",element:<NotFound/>
    },
]);