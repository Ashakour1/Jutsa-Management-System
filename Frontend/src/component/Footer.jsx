import React from "react";

const Footer = () => {
  return (
    <div className="mt-auto">
      <div className="flex flex-col justify-center items-center">
        <img
          className="h-14 w-14  sm:w-14 sm:h-14"
          src="/logojpg.jpg"
          alt="img"
        />
      </div>
      <div className="text-black font-bold h-10 ">
        <hr className="border border-1.5 border-gray-800 mr-4 ml-4" />
      </div>

      <p className="flex flex-col justify-center items-center mb-6 mt-6 text-gray-500">
        @ 2024 Jutsa All right Reserved
      </p>
    </div>
  );
};

export default Footer;
