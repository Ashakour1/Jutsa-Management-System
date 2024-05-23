import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";

const Header = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const [openNav, setOpenNav] = useState(false);

  const openNavBar = () => {
    setNavIsOpen(!navIsOpen);
  };
  return (
    <header className="backdrop-blur-sm fixed w-full top-0 ">
      <div className=" flex justify-between items-center px-5 max-w-[1140px] mx-auto h-16 mt-1">
        <div className="logo">
          {/* <img src="./logo.png" alt="" /> */}
          <h1 className="text-xl font-semibold">JUTSA</h1>
        </div>
        <div className="hidden md:flex gap-3 pr-20">
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
        <div className="hidden md:flex">
          <button className="px-4 py-2 rounded-md bg-customBlue text-white">
            Register Now
          </button>
        </div>
      </div>
      {/* mobile */}

      <div onClick={openNavBar} className="md:hidden block items-center">
        {navIsOpen ? (
          <button className="md:hidden absolute top-5 right-4">
            <TiThMenuOutline className="text-2xl" />
          </button>
        ) : (
          <button className="md:hidden absolute top-5 right-4">
            <TiThMenuOutline className="text-2xl" />
          </button>
        )}
      </div>

      {navIsOpen ? (
        <div className="md:hidden absolute top-12 rounded-sm right-0 h-60 w-full text-white bg-customBlue mr-2 p-4">
          <div className="flex flex-col ">
            <Link className="font-medium p-4" to="/">
              Home
            </Link>
            <Link className="font-medium p-4" to="/about">
              About
            </Link>
            <Link className="font-medium p-4" to="/faq">
              FAQ
            </Link>
          </div>
          <div className="md:hidden flex">
            <button className="px-4 py-2 rounded-md bg-customGreen text-white">
              Register Now
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
