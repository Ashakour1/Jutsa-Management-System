import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="flex flex-col pt-44 pl-10 text-white bg-gray-300 h-[600px] md:h-[500px] lg:h-[700px]">
      <div className="lg:max-w-2xl md:max-w-xl flex flex-col space-y-3">
        <h1 className="text-3xl font-black md:text-4xl">
          Empowering Students to Excel in Technology
        </h1>
        <p className="text-sm md:text-base">
          Welcome to <span className="text-customBlue">JUTSA</span>, the student association for the Faculty
          of Computer and IT at Jamhuriya University for Science and Technology.
          Our mission is to provide a platform for students to explore and
          thrive in the world of technology.
        </p>
      </div>
      <div className="flex gap-4 py-4">
        <Link to="/register">
          <button className="md:py-3 h-12 py-2 sm:py-2  px-3 sm:px-4 md:px-6 bg-customGreen text-white rounded-md  text-sm font-medium">
            Join Now
          </button>
        </Link>

        <Link to="/about">
          <button className="items-center justify-center rounded-md border border-gray-200 bg-white md:py-3 h-12 py-2 sm:py-2  px-3 sm:px-4 md:px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-200 text-customBlue disabled:pointer-events-none disabled:opacity-50">
            Learn More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
