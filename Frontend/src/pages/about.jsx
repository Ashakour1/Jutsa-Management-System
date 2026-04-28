import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { CgArrowRight } from "react-icons/cg";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | JUTSA — Jamhuriya University Tech Student Association</title>
        <meta
          name="description"
          content="Vision, mission, and leadership at the Jamhuriya University Technology Student Association. See Achievements for Jutsa 9 and Jutsa 10."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200/80 bg-gradient-to-br from-customBlue via-[#16185c] to-customBlue text-white">
          <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 md:pb-20 md:pt-32">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-customGreen" aria-hidden />
              Jamhuriya University
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              About JUTSA
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/85 leading-relaxed">
              The Technology Student Association brings students together around
              innovation, learning, and community — on campus and online.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/achievements"
                className="inline-flex items-center rounded-xl bg-customGreen px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:brightness-110"
              >
                Achievements
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Contact
              </Link>
              <Link
                to="/management"
                className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Meet the team
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 md:py-24">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-lg font-semibold text-customBlue">
              Jutsa 9 &amp; Jutsa 10
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600 leading-relaxed">
              We keep a public record of what the association has delivered and
              what we are working on now — from election and management systems to
              the website and the current chapter.
            </p>
            <Link
              to="/achievements"
              className="mt-4 inline-flex items-center text-sm font-semibold text-customGreen hover:text-customBlue"
            >
              Open the Achievements page
              <CgArrowRight className="ml-1 h-4 w-4" aria-hidden />
            </Link>
          </section>

          <section className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-customGreen">
                Our vision
              </p>
              <h2 className="mt-3 text-2xl font-bold text-customBlue leading-snug">
                A community passionate about technology
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                JUTSA is designed to foster innovation and collaboration among
                tech enthusiasts at Jamhuriya University. We explore new ideas,
                build projects together, and make learning memorable and
                impactful.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-customGreen">
                Our mission
              </p>
              <h2 className="mt-3 text-2xl font-bold text-customBlue leading-snug">
                Empowering students through technology
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                We provide the knowledge, skills, and resources students need to
                grow in a fast-changing industry — through hands-on experiences,
                collaboration, and connections that support your future career.
              </p>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 shadow-sm">
            <div className="aspect-[21/9] min-h-[200px] w-full md:aspect-[3/1]">
              <img
                src="/about-page.jpg"
                alt="Students collaborating on a tech project"
                className="h-full w-full object-cover opacity-95"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-customGreen">
              President&apos;s message
            </p>
            <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-start">
              <img
                src="/president.jpg"
                alt="Hassan Abdikariim Aymoy, President of JUTSA"
                width={220}
                height={220}
                className="h-48 w-48 shrink-0 rounded-2xl object-cover shadow-md md:h-52 md:w-52"
              />
              <div>
                <h2 className="text-xl font-semibold text-customBlue md:text-2xl">
                  Hassan Abdikariim Aymoy
                </h2>
                <p className="mt-1 text-sm font-medium text-customGreen">
                  President
                </p>
                <blockquote className="mt-5 border-l-4 border-customGreen pl-5 text-slate-600 leading-relaxed">
                  As president of the Tech Student Association at Jamhuriya
                  University, I welcome you to our community of innovators and
                  future tech leaders. Our association is more than a club —
                  it&apos;s a launchpad for your tech career. Together we will
                  explore, learn, and create the technologies that shape our
                  future.
                </blockquote>
              </div>
            </div>
          </section>

          <section className="grid gap-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm md:grid-cols-[auto_1fr] md:gap-0">
            <div className="flex justify-center bg-slate-100/80 p-8 md:items-center md:justify-start md:p-10">
              <img
                src="/cdo.jpg"
                alt="Abdishakur Mohamed Hussein, Chief Development Officer"
                width={200}
                height={200}
                className="h-40 w-40 rounded-full object-cover ring-4 ring-customGreen/20 md:h-48 md:w-48"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-customGreen">
                Innovation lead
              </p>
              <h2 className="mt-2 text-xl font-semibold text-customBlue md:text-2xl">
                Abdishakur Mohamed Hussein
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Chief Development Officer
              </p>
              <blockquote className="mt-5 text-slate-600 leading-relaxed italic">
                Innovation is at the heart of everything we do. We&apos;re not
                only learning about technology — we&apos;re building solutions
                that can make a real difference at our university and beyond.
              </blockquote>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
