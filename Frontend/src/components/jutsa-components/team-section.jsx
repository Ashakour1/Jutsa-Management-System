import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoBasketballOutline } from "react-icons/io5";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Hassan Abdikarim Eymoy",
      role: "President",
      description:
        "Leading our initiatives and representing student interests.",
      image: "/president.jpg",
    },
    {
      name: "Maria Chan",
      role: "Vice President",
      description: "Supporting the president and managing events.",
      image:
        "https://utfs.io/f/66b122b2-eefe-4e73-a744-5abec8dc8bd1-x9pr84.png",
    },
    {
      name: "Abdishakur Mohamed",
      role: "Chief Development Officer",
      description: "Overseeing finances and budgeting for activities.",
      image: "/cdo.jpg",
    },
    {
      name: "Emily Davis",
      role: "Secretary",
      description: "Documenting meetings and maintaining communications.",
      image:
        "https://utfs.io/f/66b122b2-eefe-4e73-a744-5abec8dc8bd1-x9pr84.png",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h2 className="font-bold mb-2 text-customGreen">Team</h2>
      <h1 className="text-3xl font-bold mb-2 text-customBlue">Meet Our Team</h1>
      <p className="mb-8">Meet the dedicated members of AITSA.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index}>
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-base text-customBlue font-semibold mb-1">
                {member.name}
              </h2>
              <p className="text-sm text-customGreen font-bold mb-2">
                {member.role}
              </p>
              <p className="text-gray-700 text-sm mb-4">{member.description}</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-600 text-xl">
                  <FaXTwitter />
                </a>
                <a href="#" className="hover:text-gray-600 text-xl">
                  <FaLinkedin />
                </a>
                <a href="#" className="hover:text-gray-600 text-xl">
                  <IoBasketballOutline />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
