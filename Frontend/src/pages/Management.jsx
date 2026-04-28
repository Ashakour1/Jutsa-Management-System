import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { managementTeam, teamImageUrl } from "../data/management-team";

const Management = () => {
  return (
    <>
      <Helmet>
        <title>JUTSA Management Team | Jamhuriya University Tech Student Association</title>
        <meta
          name="description"
          content="Meet the JUTSA management team — leadership roles across education, finance, media, sports, and external affairs at Jamhuriya University."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 pt-28 pb-16">
          <nav className="text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-customBlue">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-customBlue font-medium">Management</span>
          </nav>

          <header className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-customGreen font-semibold text-sm uppercase tracking-wide mb-2">
              Leadership
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-customBlue mb-4">
              JUTSA Management
            </h1>
            <p className="text-gray-600 leading-relaxed">
              The elected and appointed officers guiding Jamhuriya University Tech
              Student Association — shaping programs, partnerships, and member
              experience across campus.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {managementTeam.map((member) => (
              <article
                key={member.imageFile}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
                  <img
                    src={teamImageUrl(member.imageFile)}
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
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {member.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="text-center text-sm text-gray-600 mt-14">
            Officers who served in prior terms:{" "}
            <Link
              to="/former-leadership"
              className="text-customBlue font-medium underline underline-offset-2 hover:text-customGreen"
            >
              View former leadership
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Management;
