import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md h-18">
      <div className="max-w-[1040px] mx-auto h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link className="" href="#">
            Home
          </Link>
          <Link className="" href="#">
            About
          </Link>
          <Link className="" href="#">
            FAQ
          </Link>
        </div>
        <div className="flex-grow flex justify-center">
          <img src="./logo.png" alt="logo" className="h-full pr-20" />
        </div>
        <div>
          <button className="py-2 px-4 bg-customGreen rounded-sm">
            Register Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
