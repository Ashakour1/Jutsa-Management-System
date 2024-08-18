import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { routes } from "./Header";

const HeaderMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <img src="logo.png" alt="logo" className="w-10 h-10" />
        <nav className="grid gap-6 text-lg font-medium">
          {routes.map((route, index) => (
            <Link
              key={index}
              to={route.route}
              className="flex items-center gap-4"
            >
              <span>{route.name}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderMobile;
