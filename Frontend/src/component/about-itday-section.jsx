import React from "react";
import { FaSpinner } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { TbBrandAmazon } from "react-icons/tb";

const AboutItDaySection = () => {
  return (
    <section className="py-12 md:py-24" id="about">
      <div className="container mx-auto px-4 md:px-6 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            About IT-DAY
          </h2>
          <p className="text-gray-500  text-lg max-w-[900px] mx-auto">
            IT-DAY is an annual event that celebrates the innovation and
            excellence of our IT students. It's a platform for them to showcase
            their skills, projects, and achievements.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-800 p-8 shadow-xl  hover:border-customBlue hover:shadow-gray-400 space-y-4">
            <FaSpinner className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-bold">Innovation</h3>
            <p className="text-gray-500 ">
              Witness the cutting-edge projects and innovative solutions
              developed by our talented students.
            </p>
          </div>
          <div className="rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-customBlue hover:shadow-gray-400 space-y-4">
            <TbBrandAmazon className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-bold">Excellence</h3>
            <p className="text-gray-500 ">
              Celebrate the exceptional achievements and technical prowess of
              our IT students.
            </p>
          </div>
          <div className="rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-customBlue hover:shadow-gray-400 space-y-4">
            <MdShowChart className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-bold">Showcase</h3>
            <p className="text-gray-500 ">
              Discover the latest advancements in technology through student
              presentations and demonstrations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutItDaySection;
