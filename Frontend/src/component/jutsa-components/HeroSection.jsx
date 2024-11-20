import { useEffect, useState } from "react";
import { CgArrowRight, CgCalendar } from "react-icons/cg";
import { FaBookOpen, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full lg:h-[600px]  py-10 bg-gradient-to-br from-customBlue to-customGreen text-white overflow-hidden">
      <div className="inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
      <div className="max-w-contain px-4 py-16 mx-auto flex flex-col lg:flex-row items-center">
        {/* Text Content Section */}
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left pt-10 lg:pr-10">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-xl xl:text-4xl leading-tight">
            Empowering Students,{" "}
            <span className="text-customGreen">Shaping Futures</span>
          </h1>
          <p className="max-w-[600px] text-xl text-purple-100 mx-auto lg:mx-0">
            Join a vibrant community of learners, leaders, and innovators. Let's
            create unforgettable memories and set the stage for your success.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              to="/join"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-customBlue bg-white hover:bg-purple-50 transition duration-300"
            >
              Become a Member
              <CgArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full bg-customBlue hover:bg-purple-400 transition duration-300"
            >
              Explore Events
              <CgCalendar className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="pt-5 flex items-center justify-center lg:justify-start space-x-6 text-purple-100">
            <div className="flex items-center">
              <FaUsers className="h-6 w-6 mr-2" />
              <span>5000+ Members</span>
            </div>
            <div className="flex items-center">
              <FaBookOpen className="h-6 w-6 mr-2" />
              <span>50+ Clubs</span>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 lg:pl-10">
          <div className="grid grid-cols-2 gap-4 max-w-[500px] mx-auto">
            {mounted && (
              <>
                <img
                  src="/hero-5.jpg"
                  alt="Students collaborating"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
                />
                <img
                  src="/hero-2.jpg"
                  alt="Student presentation"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
                />
                <img
                  src="/hero-3.jpg"
                  alt="Campus event"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
                />
                <img
                  src="/hero-4.jpg"
                  alt="Student diversity"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
