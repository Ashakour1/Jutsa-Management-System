import { clsx } from "clsx";
import { CiMenuBurger } from "react-icons/ci";
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet';
import { routes } from "./DesktopNav";

const MobileNav = () => {
  const { pathname } = useLocation()
  return (
  <Sheet>
    <SheetTrigger asChild>
      <Button size="icon" variant="outline" className="sm:hidden">
        <CiMenuBurger/>
        <span className="sr-only">Menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="sm:max-w-xs" title="menu">
      <SheetTitle>
        <Link
          to="/dashboard"          
        >
        <img
          src="/logo.png"
          className="h-14 w-14 transition-all group-hover:scale-110"
        />
        <span className="sr-only">JUTSA</span>
        </Link>
      </SheetTitle>
      <SheetDescription hidden>mobile navigation menu</SheetDescription>
      <nav className="grid gap-6 mt-4 text-lg font-medium">
        <ul className="flex flex-col space-y-5">
          {
            routes.map((route,index)=>(
              <li key={index}>
                <SheetClose asChild>
                <Link
                  to={route.route}
                  className={clsx(
                    "flex items-center gap-4 px-2.5 text-foreground",
                    {
                      "rounded-lg bg-accent text-accent-foreground py-1": route.route === pathname || pathname.includes(route.route.split("/dashboard")[1])
                    }
                  )}
                  
                  >
                  {route.icon}
                  {route.name}
                </Link>
                  </SheetClose>
              </li>
            ))
          }
        </ul>
      </nav>
    </SheetContent>
  </Sheet> 
  )
}

export default MobileNav