import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoBasketballOutline } from "react-icons/io5";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "President",
      description:
        "Leading our initiatives and representing student interests.",
      image:
        "https://utfs.io/f/66b122b2-eefe-4e73-a744-5abec8dc8bd1-x9pr84.png",
    },
    {
      name: "Maria Chan",
      role: "Vice President",
      description: "Supporting the president and managing events.",
      image:
        "https://utfs.io/f/66b122b2-eefe-4e73-a744-5abec8dc8bd1-x9pr84.png",
    },
    {
      name: "John Smith",
      role: "Treasurer",
      description: "Overseeing finances and budgeting for activities.",
      image:
        "https://utfs.io/f/66b122b2-eefe-4e73-a744-5abec8dc8bd1-x9pr84.png",
    },
    {
      name: "Emily Davis",
      role: "Secretary",
      description: "Documenting meetings and maintaining communications.",
      image:
        "https://utfs.io/f/66b122b2-eefe-4e73-a744-5abec8dc8bd1-x9pr84.png",
    },
    {
      name: "Michael Lee",
      role: "Event Coordinator",
      description: "Planning and executing student events and activities.",
      image:
        "https://utfs.io/f/66b122b2-eefe-4e73-a744-5abec8dc8bd1-x9pr84.png",
    },
    {
      name: "Sarah Brown",
      role: "Marketing Lead",
      description: "Promoting AITSA and engaging with the student body.",
      image:
        "https://utfs.io/f/66b122b2-eefe-4e73-a744-5abec8dc8bd1-x9pr84.png",
    },
    {
      name: "David Wilson",
      role: "Tech Support",
      description: "Providing technical assistance for events and activities.",
      image:
        "https://utfs.io/f/66b122b2-eefe-4e73-a744-5abec8dc8bd1-x9pr84.png",
    },
    {
      name: "Rachel Green",
      role: "Outreach Officer",
      description: "Connecting with other organizations and communities.",
      image:
        "https://utfs.io/f/66b122b2-eefe-4e73-a744-5abec8dc8bd1-x9pr84.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="font-bold mb-2">Team</h2>
      <h1 className="text-3xl font-bold mb-2">Our Team</h1>
      <p className="mb-8">Meet the dedicated members of AITSA.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index}>
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{member.name}</h2>
              <p className="text-sm font-bold mb-2">{member.role}</p>
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
      <div className="my-4 space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold">we{"'"}re hiring!</h1>
        <p>Join our team and make a difference!</p>
        <a
          href="#"
          className="py-3 px-6 border-2 border-black block w-fit capitalize hover:bg-black hover:text-white duration-150"
        >
          open position
        </a>
      </div>
    </div>
  );
}
