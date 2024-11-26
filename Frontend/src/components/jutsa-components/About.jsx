import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="bg-gray-100 ">
      <div className="flex  flex-col max-w-[1200px] md:h-full py-10 h-full mx-auto">
        <div className="flex flex-col  justify-center items-center">
          <h1 className="max-w-xl text-3xl font-bold text-customBlue">
            About Us
          </h1>
          <p className="max-w-3xl text-gray-500 text-center mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            gravida, nisl nec faucibus vestibulum, nulla nunc varius lectus, nec
            fermentum nunc felis at turpis. Nullam euismod, nulla ac vehicula
            ultricies,
          </p>
        </div>
        <div className="p-2   flex flex-col px-4 md:px-0 md:flex-row gap-4 pt-4 justify-center">
          <div className="max-w-md flex-1 flex items-center">
            <img
              src="/hero-image.jpg"
              alt=""
              className="w-full h-full rounded-lg object-cover"
              style={{ height: "300px" }} // Set a fixed height
            />
          </div>
          <div className="w-full flex flex-col justify-between  flex-1">
            <div className="space-y-3">
              <h1 className="text-xl font-bold text-customGreen">Who we Are</h1>
              <p className="text-gray-500 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                gravida, nisl nec faucibus vestibulum, nulla nunc varius lectus,
                nec fermentum nunc felis at turpis. Nullam euismod, nulla ac
                vehicula ultricies, nulla nunc varius lectus, nec fermentum nunc
                felis at turpis. Nullam euismod, nulla ac vehicula ultricies,
              </p>
              <h1 className="text-xl font-bold text-customGreen">What we do</h1>
              <p className="text-gray-500 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                gravida, nisl nec faucibus vestibulum, nulla nunc varius lectus,
                nec fermentum nunc felis at turpis. Nullam euismod, nulla ac
                vehicula ultricies,
              </p>
              <Link
                to="/"
                type="button"
                className="group flex items-center transition ease-in-out  text-customGreen"
              >
                Learn More
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
