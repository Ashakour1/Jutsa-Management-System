import { FaDesktop } from 'react-icons/fa';
import { MdConnectWithoutContact } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";


const About = () => {
  return (
    <div className="max-w-[1240px] md:pt-16 pt-10 mx-auto h-full flex flex-col">
      <div className="mx-auto max-w-contain px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[850px] text-center">
          <h2 className="text-2xl font-semibold sm:text-4xl">
            IT-DAY: Celebrating Innovation and Excellence
          </h2>

          <p className="mt-4 text-gray-500">
            IT-DAY is a highly anticipated event for students across various departments within the IT faculty, including the Department of Computer Application, Department of Network, and Department of Multimedia. This special day is dedicated to showcasing the skills and knowledge that students have acquired throughout their academic journey. It’s a celebration of innovation, creativity, and technical prowess.
          </p>
        </div>

        <div className="mx-auto max-w-[850px] text-start">
          <h2 className="text-2xl font-semibold sm:text-4xl">
            A Day of Showcasing Talent and Ingenuity
          </h2>

          <p className="mt-4 text-gray-500">
            On IT-DAY, students get the unique opportunity to present their projects and accomplishments. These presentations are not just a display of technical skills but also a testament to the hard work and dedication invested by the students. Each department brings a unique flavor to the event.
          </p>
        </div>

        <div className="mx-auto max-w-[850px] text-start">
            <h2 className="text-2xl font-semibold sm:text-4xl">
              Inspiring the Next Generation
            </h2>

            <p className="mt-4 text-gray-500">
              One of the key goals of IT-DAY is to inspire new students. By witnessing the achievements of their peers, newcomers to the university gain a sense of the possibilities that lie ahead. IT-DAY serves as a motivational platform, encouraging them to think creatively and strive for excellence in their respective fields.
            </p>
          </div>

          <div className="mx-auto max-w-[850px] text-start">
            <h2 className="text-2xl font-semibold sm:text-4xl">
              Building a Bridge to the Future
            </h2>

            <p className="mt-4 text-gray-500">
              IT-DAY is not just about celebrating the present; it’s about building a bridge to the future. It provides a glimpse into the potential contributions that students can make to society and technology. The projects presented are often geared towards solving contemporary issues, reflecting a commitment to societal advancement through technological innovation.
            </p>
          </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="flex flex-col text-start items-start rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-customGreen hover:shadow-green-100"
            href="#"
          >
            <FaDesktop className="text-customGreen text-5xl text-start items-start" />

            <h2 className="mt-4 text-xl font-bold text-black">Department of Computer Application</h2>

            <p className="mt-1 text-sm text-gray-500">
              Students from this department demonstrate their expertise in software development, algorithms, and data analysis. Projects often include innovative applications, advanced algorithms, and data-driven solutions designed to solve real-world problems.
            </p>
          </div>

          <div
            className="flex flex-col text-start items-start rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-customGreen hover:shadow-green-100"
            href="#"
          >
            <MdConnectWithoutContact  className="text-customGreen text-5xl text-start items-start" />

            <h2 className="mt-4 text-xl font-bold text-black">Department of Network</h2>

            <p className="mt-1 text-sm text-gray-500">
              Here, the focus is on network design, security, and management. Students present projects that showcase the latest in network technology, cybersecurity measures, and efficient data communication strategies.
            </p>
          </div>

          <div
            className="flex flex-col text-start items-start rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-customGreen hover:shadow-green-100"
            href="#"
          >
            <CgCommunity className="text-customGreen text-5xl text-start items-start" />

            <h2 className="mt-4 text-xl font-bold text-black">
              Department of Multimedia
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              This department highlights the creative fusion of technology and artistry. Projects include cutting-edge multimedia presentations, interactive designs, and immersive virtual reality experiences that push the boundaries of digital creativity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;