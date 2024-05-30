import React from "react";

const Footer = () => {
  return (
    <div className="mt-auto">
      <div className="flex flex-col justify-center items-center">
        <img className="h-15 w-10 py-5 sm:w-50 sm:h-30" src="/logo.png" alt="img" />
      </div>
      <div className="text-black font-bold h-10">
        <hr className="border-t border-1.5 border-black" />
      </div>

      <p className="flex flex-col font-bold justify-center items-center mb-6 mt-6">
        @ 2024 Jutsa All right Reserved
      </p>
    </div>
  );
};

export default Footer;
