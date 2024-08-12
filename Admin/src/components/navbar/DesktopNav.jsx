import { CiCalendar } from "react-icons/ci";
import { FiDollarSign, FiInbox } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import { IoTrophyOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import clsx from "clsx";

// add your route path here route:/dashboard/pathname
export const routes = [
  {
    name: "Finance",
    route:"/dashboard/",
    icon:<FiDollarSign className="h-5 w-5" />
  },
  {
    name: "Positions",
    route:"/dashboard/",
    icon:<LuUsers className="h-5 w-5" />
  },
  {
    name: "Members",
    route:"/dashboard/",
    icon:<LuUsers className="h-5 w-5" />
  },
  {
    name: "Sports",
    route:"/dashboard/sports",
    icon:<IoTrophyOutline className="h-5 w-5" />
  },
  {
    name: "IT Day",
    route:"/dashboard/",
    icon:<CiCalendar className="h-5 w-5" />
  },
  {
    name: "User Management",
    route:"/dashboard/",
    icon:<GoGear className="h-5 w-5" />
  },
]

const DesktopNav = () => {
  const { pathname } = useLocation()
  return (
    <TooltipProvider>
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/dashboard"          
        >
        <img
          src="/logo.png"
          className="h-10 w-10 transition-all group-hover:scale-110"
        />
        <span className="sr-only">Jutsa</span>
        </Link>
        {
          routes.map((route,index)=>(

            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  to={route.route}
                  className={clsx(
                    "flex h-9 w-9 items-center justify-center transition-colors hover:text-foreground md:h-8 md:w-8",
                    {
                      "rounded-lg bg-accent text-accent-foreground": route.route === pathname || pathname.includes(route.route.split("/dashboard")[1])
                    }
                  )}
        
                >
                {route.icon}
                <span className="sr-only">{route.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{route.name}</TooltipContent>
            </Tooltip>

          ))
        }
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/dashboard/"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
    
            >
              <GoGear className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </TooltipProvider>  
  )}

export default DesktopNav