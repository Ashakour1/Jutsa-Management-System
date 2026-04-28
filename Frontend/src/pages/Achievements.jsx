import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { aboutMilestones } from "../data/about-milestones";

const Achievements = () => {
  const { jutsa9, jutsa10 } = aboutMilestones;

  return (
    <>
      <Helmet>
        <title>Achievements | JUTSA — Jamhuriya University Tech Student Association</title>
        <meta
          name="description"
          content="JUTSA achievements: Jutsa 9 delivered the election system, management system, and website. Jutsa 10 is what we are building now."
        />
      </Helmet>

      <div className="min-h-screen bg-white text-stone-800">
        <header className="border-b border-stone-200">
          <div className="mx-auto container px-5 pt-24 pb-12 md:pt-28 md:pb-14">
            <nav className="mb-8 text-sm text-stone-500">
              <Link to="/" className="hover:text-customBlue">
                Home
              </Link>
              <span className="mx-2 text-stone-300">·</span>
              <Link to="/about" className="hover:text-customBlue">
                About
              </Link>
              <span className="mx-2 text-stone-300">·</span>
              <span className="text-stone-700">Achievements</span>
            </nav>
            <h1 className="text-3xl font-semibold tracking-tight text-customBlue md:text-[2rem] md:leading-snug">
              Achievements
            </h1>
            <p className="mt-4 text-base leading-relaxed text-stone-600 md:text-[1.05rem]">
              Here&apos;s what we&apos;ve already delivered, and what we&apos;re
              spending time on now.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link
                to="/management"
                className="text-customGreen underline decoration-customGreen/40 underline-offset-4 hover:decoration-customGreen"
              >
                Current management
              </Link>
              <Link
                to="/contact"
                className="text-customGreen underline decoration-customGreen/40 underline-offset-4 hover:decoration-customGreen"
              >
                Contact
              </Link>
            </div>
          </div>
        </header>

        <main>
          {/* Jutsa 9 */}
          <section className="border-b border-stone-200 ">
            <div className="mx-auto container px-5 py-14 md:py-16">
              <p className="text-sm text-stone-500">{jutsa9.statusLabel}</p>
              <h2 className="mt-2 text-3xl font-semibold text-customBlue">
                {jutsa9.title}
              </h2>
              <p className="mt-5 leading-relaxed text-stone-600">{jutsa9.intro}</p>

              <div className="mt-12 space-y-12">
                {jutsa9.pillars.map((pillar) => (
                  <div key={pillar.title} className="border-b border-y-none p-4  w-full">
                    <h3 className="text-lg font-medium text-customBlue">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-stone-600">
                      {pillar.description}
                    </p>
                    <p className="mt-3">
                      <Link
                        to={pillar.href}
                        className="text-sm text-customGreen underline decoration-customGreen/35 underline-offset-[5px] hover:decoration-customGreen"
                      >
                        {pillar.linkText}
                      </Link>
                    </p>
                  </div>
                ))}
              </div>

              {jutsa9.moreHighlights?.length ? (
                <div className="mt-14">
                  <h3 className="text-base font-medium text-stone-800">
                    A few other outcomes
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-600 marker:text-stone-400">
                    {jutsa9.moreHighlights.map((line, i) => (
                      <li key={i} className="leading-relaxed">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>

          {/* Jutsa 10 */}
          <section className="bg-stone-50/80">
            <div className="mx-auto container px-5 py-14 md:py-16">
              <p className="text-sm text-stone-500">{jutsa10.statusLabel}</p>
              <h2 className="mt-2 text-3xl font-semibold text-customBlue">
                {jutsa10.title}
              </h2>
              <p className="mt-5 leading-relaxed text-stone-600">
                {jutsa10.intro}
              </p>

              <ul className="mt-10 space-y-10">
                {jutsa10.inProgress.map((item) => (
                  <li key={item.title} className="border-b border-y-none p-4  w-full">
                    <h3 className="text-lg font-medium text-customBlue">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-stone-600">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>

              <p className="mt-12 text-stone-600">
                If you want to talk through any of this, you can always{" "}
                <Link
                  to="/contact"
                  className="text-customBlue underline decoration-customBlue/30 underline-offset-[5px] hover:decoration-customBlue"
                >
                  reach us on the contact page
                </Link>
                .
              </p>
            </div>
          </section>

        </main>
      </div>
    </>
  );
};

export default Achievements;
