import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="backdrop-blur-sm fixed w-full top-0 ">
      <div className=" flex justify-between items-center px-10 max-w-[1140px] mx-auto h-16 mt-1">
        <div className="logo">
          <img src="./logo.png" alt="" className="w-48" />
        </div>
        <div className="flex gap-3 pr-20">
          <Link className="font-medium" to="/">
            Home
          </Link>
          <Link className="font-medium" to="/about">
            About
          </Link>
          <Link className="font-medium" to="/faq">
            FAQ
          </Link>
        </div>
        <div>
          <button className="px-4 py-2 rounded-md bg-customBlue text-white">
            Register Now
          </button>
        </div>
      </div>
      
    </header>
  );
};

export default Header;
