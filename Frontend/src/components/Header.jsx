import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { TiThMenuOutline } from "react-icons/ti";

const Header = () => {
  const { pathname } = useLocation();
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [mobileMgmtOpen, setMobileMgmtOpen] = useState(false);
  const [mobileActivitiesOpen, setMobileActivitiesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const managementRoutes = ["/management", "/former-leadership"];
  const activitiesRoutes = ["/it-day", "/sports"];
  const aboutActive =
    pathname === "/achievements" ||
    pathname === "/about" ||
    pathname.startsWith("/about/");
  const managementActive = managementRoutes.some((p) => pathname === p);
  const activitiesActive = activitiesRoutes.some((p) => pathname === p);

  useEffect(() => {
    setMobileAboutOpen(aboutActive);
    setMobileMgmtOpen(managementActive);
    setMobileActivitiesOpen(activitiesActive);
  }, [pathname, aboutActive, managementActive, activitiesActive]);

  const navLinkClass = ({ isActive }) =>
    [
      "font-medium text-sm p-4 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-customBlue focus-visible:ring-offset-2",
      isActive ? "text-customBlue bg-black/5" : "hover:bg-black/5",
    ].join(" ");

  const dropdownTriggerClass = (active) =>
    [
      "font-medium text-sm p-4 inline-flex items-center gap-1 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-customBlue focus-visible:ring-offset-2",
      active ? "text-customBlue bg-black/5" : "hover:bg-black/5",
    ].join(" ");

  const subLinkClass = ({ isActive }) =>
    [
      "block w-full px-4 py-2.5 text-start text-sm font-medium hover:bg-gray-50",
      isActive ? "text-customBlue bg-gray-50" : "text-customBlue",
    ].join(" ");

  const openNavBar = () => {
    setNavIsOpen(!navIsOpen);
  };

  const closeNavBar = () => {
    setNavIsOpen(false);
    setMobileAboutOpen(false);
    setMobileMgmtOpen(false);
    setMobileActivitiesOpen(false);
  };
  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100/80 bg-white/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="flex justify-between items-center px-5 max-w-[1200px] mx-auto h-16 mt-1">
        <div className="logo">
          <Link to="/" className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-customBlue focus-visible:ring-offset-2">
            <img src="./logo.png" alt="JUTSA home" className="w-10" />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-1">
          <NavLink className={navLinkClass} to="/" end>
            Home
          </NavLink>
          <div className="relative group">
            <button
              type="button"
              className={dropdownTriggerClass(aboutActive)}
              aria-haspopup="true"
              aria-expanded="false"
              aria-label="About us menu"
              aria-current={aboutActive ? "true" : undefined}
            >
              About us
              <IoChevronDown className="text-base opacity-70 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div
              className="absolute left-0 top-full z-50 min-w-[220px] pt-1
                opacity-0 invisible translate-y-1
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0
                transition-all duration-150"
              role="menu"
            >
              <div className="rounded-lg border border-gray-100 bg-white py-2 text-start shadow-lg ring-1 ring-black/5">
                <NavLink className={subLinkClass} to="/about" end>
                  About JUTSA
                </NavLink>
                <NavLink className={subLinkClass} to="/achievements">
                  Achievements
                </NavLink>
                <NavLink className={subLinkClass} to="/about/faq">
                  FAQ
                </NavLink>
              </div>
            </div>
          </div>
          <div className="relative group">
            <button
              type="button"
              className={dropdownTriggerClass(managementActive)}
              aria-haspopup="true"
              aria-expanded="false"
              aria-label="Management menu"
              aria-current={managementActive ? "true" : undefined}
            >
              Management
              <IoChevronDown className="text-base opacity-70 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div
              className="absolute left-0 top-full z-50 min-w-[220px] pt-1
                opacity-0 invisible translate-y-1
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0
                transition-all duration-150"
              role="menu"
            >
              <div className="rounded-lg border border-gray-100 bg-white py-2 text-start shadow-lg ring-1 ring-black/5">
                <NavLink className={subLinkClass} to="/management">
                  Current management
                </NavLink>
                <NavLink className={subLinkClass} to="/former-leadership">
                  Former leadership
                </NavLink>
              </div>
            </div>
          </div>
          <div className="relative group">
            <button
              type="button"
              className={dropdownTriggerClass(activitiesActive)}
              aria-haspopup="true"
              aria-expanded="false"
              aria-label="Activities menu"
              aria-current={activitiesActive ? "true" : undefined}
            >
              Activities
              <IoChevronDown className="text-base opacity-70 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div
              className="absolute left-0 top-full z-50 min-w-[220px] pt-1
                opacity-0 invisible translate-y-1
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0
                transition-all duration-150"
              role="menu"
            >
              <div className="rounded-lg border border-gray-100 bg-white py-2 text-start shadow-lg ring-1 ring-black/5">
                <NavLink className={subLinkClass} to="/it-day">
                  Faculty Day
                </NavLink>
                <NavLink className={subLinkClass} to="/sports">
                  Sports Tournament
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex">
          <Link to="/contact">
            <button
              type="button"
              className="px-5 py-2 rounded-full bg-customBlue text-white font-medium text-xs hover:opacity-90 transition-opacity"
            >
              Contact Us
            </button>
          </Link>
        </div>
      </div>
      {/* mobile */}

      <div onClick={openNavBar} className="md:hidden block items-center">
        {navIsOpen ? (
          <button className="md:hidden absolute top-4 items-center bg-customBlue text-white p-1 rounded-md right-4 ">
            <TiThMenuOutline className="text-2xl" />
          </button>
        ) : (
          <button className="md:hidden absolute top-4 items-center bg-customBlue text-white p-1 rounded-md right-4">
            <TiThMenu className="text-2xl" />
          </button>
        )}
      </div>

      {navIsOpen ? (
        <div className="md:hidden top-0 left-0 right-0 rounded-b-lg border-b border-white/20 bg-customBlue text-white p-4 pb-6 max-h-[min(85vh,calc(100dvh-4rem))] overflow-y-auto">
          <div className="flex flex-col">
            <NavLink
              onClick={closeNavBar}
              className={({ isActive }) =>
                `font-medium p-4 rounded-md ${isActive ? "bg-white/15" : ""}`
              }
              to="/"
              end
            >
              Home
            </NavLink>
            <hr className="border-white/20" />
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className={`font-medium p-4 flex items-center justify-between w-full text-start rounded-md ${aboutActive ? "bg-white/15" : ""}`}
                aria-expanded={mobileAboutOpen}
              >
                About us
                <IoChevronDown
                  className={`text-xl shrink-0 transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileAboutOpen ? (
                <div className="bg-customBlue/30 border-t border-white/20">
                  <NavLink
                    onClick={closeNavBar}
                    className={({ isActive }) =>
                      `block font-medium py-3 pl-8 pr-4 text-sm ${isActive ? "bg-white/10" : ""}`
                    }
                    to="/about"
                    end
                  >
                    About JUTSA
                  </NavLink>
                  <NavLink
                    onClick={closeNavBar}
                    className={({ isActive }) =>
                      `block font-medium py-3 pl-8 pr-4 text-sm border-t border-white/10 ${isActive ? "bg-white/10" : ""}`
                    }
                    to="/achievements"
                  >
                    Achievements
                  </NavLink>
                  <NavLink
                    onClick={closeNavBar}
                    className={({ isActive }) =>
                      `block font-medium py-3 pl-8 pr-4 text-sm border-t border-white/10 ${isActive ? "bg-white/10" : ""}`
                    }
                    to="/about/faq"
                  >
                    FAQ
                  </NavLink>
                </div>
              ) : null}
            </div>
            <hr className="border-white/20" />
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setMobileMgmtOpen(!mobileMgmtOpen)}
                className={`font-medium p-4 flex items-center justify-between w-full text-start rounded-md ${managementActive ? "bg-white/15" : ""}`}
                aria-expanded={mobileMgmtOpen}
              >
                Management
                <IoChevronDown
                  className={`text-xl shrink-0 transition-transform ${mobileMgmtOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileMgmtOpen ? (
                <div className="bg-customBlue/30 border-t border-white/20">
                  <NavLink
                    onClick={closeNavBar}
                    className={({ isActive }) =>
                      `block font-medium py-3 pl-8 pr-4 text-sm ${isActive ? "bg-white/10" : ""}`
                    }
                    to="/management"
                  >
                    Current management
                  </NavLink>
                  <NavLink
                    onClick={closeNavBar}
                    className={({ isActive }) =>
                      `block font-medium py-3 pl-8 pr-4 text-sm border-t border-white/10 ${isActive ? "bg-white/10" : ""}`
                    }
                    to="/former-leadership"
                  >
                    Former leadership
                  </NavLink>
                </div>
              ) : null}
            </div>
            <hr className="border-white/20" />
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setMobileActivitiesOpen(!mobileActivitiesOpen)}
                className={`font-medium p-4 flex items-center justify-between w-full text-start rounded-md ${activitiesActive ? "bg-white/15" : ""}`}
                aria-expanded={mobileActivitiesOpen}
              >
                Activities
                <IoChevronDown
                  className={`text-xl shrink-0 transition-transform ${mobileActivitiesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileActivitiesOpen ? (
                <div className="bg-customBlue/30 border-t border-white/20">
                  <NavLink
                    onClick={closeNavBar}
                    className={({ isActive }) =>
                      `block font-medium py-3 pl-8 pr-4 text-sm ${isActive ? "bg-white/10" : ""}`
                    }
                    to="/it-day"
                  >
                    Faculty Day
                  </NavLink>
                  <NavLink
                    onClick={closeNavBar}
                    className={({ isActive }) =>
                      `block font-medium py-3 pl-8 pr-4 text-sm border-t border-white/10 ${isActive ? "bg-white/10" : ""}`
                    }
                    to="/sports"
                  >
                    Sports Tournament
                  </NavLink>
                </div>
              ) : null}
            </div>
            <hr className="border-white/20" />
          </div>
          <div className="md:hidden flex flex-col gap-3 pt-4">
            <Link to="/contact" className="w-full" onClick={closeNavBar}>
              <button
                type="button"
                className="px-4 py-2.5 rounded-md bg-white text-customBlue font-medium w-full"
              >
                Contact Us
              </button>
            </Link>
            <Link to="/register" className="w-full" onClick={closeNavBar}>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-customGreen text-white w-full font-medium"
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
