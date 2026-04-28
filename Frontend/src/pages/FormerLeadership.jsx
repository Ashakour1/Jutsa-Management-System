import { Helmet } from "react-helmet-async";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { IoBasketballOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { formerLeadership, legacyImageSrc } from "../data/former-leadership";

const FormerLeadership = () => {
  return (
    <>
      <Helmet>
        <title>Former leadership | Jamhuriya University Tech Student Association</title>
        <meta
          name="description"
          content="Former JUTSA officers who led the association in prior terms — leadership succession archive for Jamhuriya University Tech Student Association."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 pt-28 pb-16">
          <nav className="text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-customBlue">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/management" className="hover:text-customBlue">
              Management
            </Link>
            <span className="mx-2">/</span>
            <span className="text-customBlue font-medium">Former leadership</span>
          </nav>

          <header className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-customGreen font-semibold text-sm uppercase tracking-wide mb-2">
              Leadership succession
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-customBlue mb-4">
              Former leadership
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Officers who led programs, events, and member engagement in prior
              terms. For the current roster, see{" "}
              <Link
                to="/management"
                className="text-customBlue font-medium underline underline-offset-2 hover:text-customGreen"
              >
                Management
              </Link>
              .
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {formerLeadership.map((member) => {
              const hasSocial = [member.facebook, member.linkedIn, member.website].some(
                (u) => u && u !== "#"
              );

              return (
                <article
                  key={member.name}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
                    <img
                      src={legacyImageSrc(member.image)}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="text-lg font-semibold text-customBlue">
                      {member.name}
                    </h2>
                    <p className="text-sm font-bold text-customGreen mt-1 mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
                      {member.description}
                    </p>
                    {hasSocial && (
                      <div className="flex space-x-4 pt-1 border-t border-gray-100">
                        {member.facebook && member.facebook !== "#" && (
                          <a
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-customBlue text-gray-600 text-xl"
                            aria-label={`${member.name} on Facebook`}
                          >
                            <FaFacebook />
                          </a>
                        )}
                        {member.linkedIn && member.linkedIn !== "#" && (
                          <a
                            href={member.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-customBlue text-gray-600 text-xl"
                            aria-label={`${member.name} on LinkedIn`}
                          >
                            <FaLinkedin />
                          </a>
                        )}
                        {member.website && member.website !== "#" && (
                          <a
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-customBlue text-gray-600 text-xl"
                            aria-label={`${member.name} website`}
                          >
                            <IoBasketballOutline />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormerLeadership;
