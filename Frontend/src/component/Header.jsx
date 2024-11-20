import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { TiThMenuOutline } from "react-icons/ti";

const Header = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const [openNav, setOpenNav] = useState(false);

  const openNavBar = () => {
    setNavIsOpen(!navIsOpen);
  };

  const closeNavBar = () => {
    setNavIsOpen(false);
  };
  return (
    <header className="backdrop-blur-sm fixed w-full top-0 ">
      <div className=" flex justify-between items-center px-5 max-w-[1140px] mx-auto h-16 mt-1">
        <div className="logo">
          {/* <img src="./logo.png" alt="" /> */}
          <Link to="/">
            <img src="./logo.png" alt="" className="w-10" />
          </Link>
        </div>
        <div className="hidden   md:flex gap-3 text-center items-center">
          <Link className="font-medium p-4" to="/">
            Home
          </Link>
          <Link className="font-medium p-4" to="/about">
            About
          </Link>
          <Link className="font-medium p-4" to="/it-day">
            It day
          </Link>
          <Link className="font-medium p-4" to="/sports">
            Sports
          </Link>
        </div>
        <div className="hidden md:flex">
          <Link to="/contact  ">
            <button className="px-5 py-2  rounded-full bg-customBlue text-white font-medium  text-xs">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
      {/* mobile */}

      <div onClick={openNavBar} className="md:hidden block items-center">
        {navIsOpen ? (
          <button className="md:hidden absolute top-4 bg-customBlue text-white p-1 rounded-md right-4 ">
            <TiThMenuOutline className="text-2xl" />
          </button>
        ) : (
          <button className="md:hidden absolute top-4 right-4 bg-customBlue text-white p-1 rounded-md">
            <TiThMenu className="text-2xl" />
          </button>
        )}
      </div>

      {navIsOpen ? (
        <div className="md:hidden absolute top-14 rounded-sm right-0 h-64 w-full bg-customBlue text-white bg-backdrop-blur-sm mr-2 p-4">
          <div className="flex flex-col ">
            <Link onClick={closeNavBar} className="font-medium p-4" to="/">
              Home
            </Link>
            <hr />
            <Link onClick={closeNavBar} className="font-medium p-4" to="/about">
              About
            </Link>
            <hr />
            <Link
              onClick={closeNavBar}
              className="font-medium p-4"
              to="/about/faq"
            >
              FAQ
            </Link>
            <hr />
          </div>
          <div className="md:hidden flex pt-4">
            <Link to="/register" className="w-full">
              <button
                onClick={closeNavBar}
                className="px-4 py-2 rounded-md bg-customGreen text-white w-full"
              >
                Register Now
              </button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
