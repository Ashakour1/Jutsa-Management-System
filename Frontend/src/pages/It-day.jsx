import React from "react";
import HeroSection from "../component/Hero-section-itday";
import CallToAction from "./Call-to-action";
import Benefits from "./benefits";
import AboutItDaySection from "../component/about-itday-section";
import Departments from "../component/Departments";

const ItDay = () => {
  return (
    <div>
      <HeroSection />
      <CallToAction />
      <Benefits />
      <AboutItDaySection />
      <Departments />
    </div>
  );
};

export default ItDay;
