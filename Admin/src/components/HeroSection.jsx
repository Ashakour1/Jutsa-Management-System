import React from "react";

const HeroSection = () => {
  return (
    <section className="flex flex-col justify-center p-2 md:p-5 space-y-6 text-white bg-black h-[450px]">
      <div className="md:w-[450px] w-[300px] flex flex-col space-y-3">
        <h1 className="text-3xl font-black md:text-4xl">
          Empowering Students to Excel in Technology
        </h1>
        <p className="text-sm md:text-base">
          Welcome to JUTSA, the student association for the Faculty of Computer
          and IT at Jamhuriya University for Science and Technology. Our mission
          is to provide a platform for students to explore and thrive in the
          world of technology.
        </p>
      </div>
      <div className="flex flex-row space-x-3">
        <button
          aria-label="Join the JUTSA"
          className="h-8 px-5 text-base text-black capitalize bg-white hover:bg-gray-200"
        >
          Join
        </button>
        <button
          aria-label="Learn more about JUTSA"
          className="h-8 px-5 text-base capitalize border border-solid hover:bg-gray-700"
        >
          Learn more
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
