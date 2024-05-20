import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md h-18">
      <div className="max-w-[1140px] mx-auto h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link className="font-medium" href="#">
            Home
          </Link>
          <Link className="font-medium" href="#">
            About
          </Link>
          <Link className="font-medium" href="#">
            FaQ
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src="./logo.png" alt="logo" className="h-full pr-6" />
        </div>
        <div>
          <button className="py-2 px-4 bg-customGreen text-customBlue rounded-sm">
            Register Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
