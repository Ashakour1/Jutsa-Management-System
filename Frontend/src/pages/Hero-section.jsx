import React from "react";

const HeroSection = () => {
  return (
    <main>
      <div className="max-w-[1240px] md:pt-16 pt-10 mx-auto h-full flex flex-col">
        <div className="flex flex-col md:text-center text-start sm:text-center md:px-0 px-2 justify-center md:items-center items-start sm:items-center pt-10">
          <h1 className="md:text-4xl sm:text-2xl text-[20px] max-w-[600px] font-semibold text-customBlue">
            Empowering Student{" "}
            <span className="text-customGreen">Innovators</span>
          </h1>
          <p className="md:text-xl text-base max-w-[900px] pt-2 md:pt-4">
            IT-DAY at Jamhuuriya University is a special event where Computer
            Science students showcase their projects and innovations. It’s a day
            of inspiration and opportunity
          </p>
          <div className="flex gap-2 py-4">
            <button className="py-2 px-4 bg-customGreen text-customBlue rounded-sm">
              Register Now
            </button>
            <button className="py-2 px-4 bg-customBlue text-white rounded-sm">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-full w-full flex justify-center md:px-10 px-4 py-5">
          <img
            className="w-[1140px] mx-auto rounded-md"
            src="./hero-image.jpg"
            alt=""
          />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
