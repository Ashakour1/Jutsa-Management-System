import { FaDesktop } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import { MdOutlineDesignServices } from "react-icons/md";
import { LuNetwork } from "react-icons/lu";
import { TbBrandAmazon } from "react-icons/tb";
import { FaSpinner } from "react-icons/fa";

import { MdShowChart } from "react-icons/md";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="flex-1">
      <section className="bg-white text-black py-12 md:py-24" id="hero">
        <div className="max-w-contain mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 ">
          <div className="space-y-4 pt-16">
            <h1 className="text-3xl md:text-4xl font-bold">
              IT-DAY: Celebrating Innovation and Excellence
            </h1>
            <p className="text-gray-500  text-lg">
              Discover the latest advancements in technology and witness the
              exceptional talents of our IT students.
            </p>
            <div className="flex gap-4">
              <Link to="/register">
                <button className="px-3 py-3 text-md font-medium text-white bg-customGreen rounded-md">
                  Register Now
                </button>
              </Link>
              <Link to="/about">
                <button className="items-center justify-center rounded-md border border-gray-200 bg-white md:py-3 h-12 py-2 sm:py-2  px-3 sm:px-4 md:px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-200 text-customBlue disabled:pointer-events-none disabled:opacity-50">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <img
            alt="IT-DAY"
            className="rounded-lg object-cover"
            height={400}
            src="/about_image.jpg"
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width={600}
          />
        </div>
      </section>
      <section className="py-12 md:py-24" id="about">
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              About IT-DAY
            </h2>
            <p className="text-gray-500  text-lg">
              IT-DAY is an annual event that celebrates the innovation and
              excellence of our IT students. It's a platform for them to
              showcase their skills, projects, and achievements.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-customBlue hover:shadow-gray-400 space-y-4">
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
      <section
        className="py-12 md:py-24 bg-gray-100 text-black"
        id="departments"
      >
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              Participating Departments
            </h2>
            <p className="text-gray-500  text-lg">
              IT-DAY features presentations and demonstrations from various IT
              departments.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white  rounded-lg shadow-md p-6 space-y-4">
              <FaDesktop className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold">
                Department of Computer Application
              </h3>
              <p className="text-gray-500 ">
                Students from this department showcase their expertise in
                software development, algorithms, and data analysis.
              </p>
            </div>
            <div className="bg-white  rounded-lg shadow-md p-6 space-y-4">
              <LuNetwork className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold">Department of Network</h3>
              <p className="text-gray-500 ">
                Students from this department demonstrate their skills in
                network administration, security, and infrastructure management.
              </p>
            </div>
            <div className="bg-white  rounded-lg shadow-md p-6 space-y-4">
              <MdOutlineDesignServices className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold">Department of Multimedia</h3>
              <p className="text-gray-500 ">
                Students from this department showcase their talents in graphic
                design, animation, and multimedia development.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24" id="schedule">
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Event Schedule</h2>
            <p className="text-gray-500  text-lg">
              Check out the schedule of events and activities for IT-DAY.
            </p>
          </div>
          <div className="max-w-contain mx-auto  gap-6">
            <div className="bg-white  rounded-lg shadow-md p-6 space-y-4">
              <ul className="space-y-2">
                <li>
                  <p className="text-black ">
                    <strong>DATE : </strong> 6 - JUN - 2024
                  </p>
                  <p className="text-black pt-4 ">
                    <strong>TIME : </strong> 7:00 AM - 12:00 AM
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
