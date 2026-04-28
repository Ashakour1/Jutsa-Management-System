import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { IoBasketballOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { managementTeam, teamImageUrl } from "../../data/management-team";

const TeamSection = () => {
  return (
    <section className="bg-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <h2 className="font-bold mb-2 text-center text-customGreen">Team</h2>
        <h1 className="text-3xl font-bold mb-2 text-center text-customBlue">
          Meet Our Team
        </h1>
        <p className="mb-2 text-center">
          Get to know the individuals who bring JUTSA&apos;s vision to life.
        </p>
        <p className="mb-8 text-center text-sm">
          <Link
            to="/management"
            className="text-customBlue font-medium underline underline-offset-2 hover:text-customGreen"
          >
            View full management page
          </Link>
          <span className="text-gray-400 mx-2">·</span>
          <Link
            to="/former-leadership"
            className="text-customBlue font-medium underline underline-offset-2 hover:text-customGreen"
          >
            Former leadership
          </Link>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {managementTeam.map((member) => {
            const facebook = member.facebook;
            const linkedIn = member.linkedIn;
            const website = member.website;
            const hasSocial = [facebook, linkedIn, website].some(
              (u) => u && u !== "#"
            );

            return (
              <div key={member.imageFile}>
                <img
                  src={teamImageUrl(member.imageFile)}
                  alt={member.name}
                  className="w-full h-60 object-cover object-top rounded-t-lg"
                />
                <div className="p-4 bg-white rounded-b-lg shadow-sm">
                  <h2 className="text-base text-customBlue font-semibold mb-1">
                    {member.name}
                  </h2>
                  <p className="text-sm text-customGreen font-bold mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    {member.description}
                  </p>
                  {hasSocial && (
                    <div className="flex space-x-4">
                      {facebook && facebook !== "#" && (
                        <a
                          href={facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-600 text-xl"
                        >
                          <FaFacebook />
                        </a>
                      )}
                      {linkedIn && linkedIn !== "#" && (
                        <a
                          href={linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-600 text-xl"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {website && website !== "#" && (
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-600 text-xl"
                        >
                          <IoBasketballOutline />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
