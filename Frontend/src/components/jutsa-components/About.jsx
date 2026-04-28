import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-100 via-gray-50/80 to-white">
      <div className="mx-auto flex h-full max-w-[1200px] flex-col px-4 py-14 md:px-6 md:py-16">
        <div className="flex flex-col items-center text-center md:pb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-customGreen">
            Our story
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-customBlue md:text-[2rem]">
            About Us
          </h2>
          <p className="mt-4 max-w-3xl text-center leading-relaxed text-slate-600">
            Learn more about Jutsa and what we do to help students succeed in
            the tech industry. We are a community of IT students dedicated to
            helping each other grow and learn.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-8 pt-6 md:flex-row md:items-stretch md:gap-10 md:pt-8">
          <div className="flex flex-1 items-center md:max-w-md">
            <div className="w-full overflow-hidden rounded-2xl shadow-lg shadow-slate-900/10 ring-1 ring-black/[0.06]">
              <img
                src="/hero-image.jpg"
                alt="Jutsa student community"
                width={560}
                height={360}
                className="h-[280px] w-full object-cover md:h-[300px]"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h3 className="flex items-center gap-3 text-xl font-bold text-customGreen">
                  <span
                    className="h-[3px] w-8 shrink-0 rounded-full bg-customGreen"
                    aria-hidden
                  />
                  Who we Are
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Jutsa is a student association that brings together IT students
                  from Jamhuuriya University of Science and Technology. We are
                  dedicated to fostering a community of collaboration and growth
                  in the field of technology.
                </p>
              </div>
              <div>
                <h3 className="flex items-center gap-3 text-xl font-bold text-customGreen">
                  <span
                    className="h-[3px] w-8 shrink-0 rounded-full bg-customGreen/70"
                    aria-hidden
                  />
                  What we do
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  We organize events, workshops, and competitions to help students
                  develop their skills and connect with industry professionals.
                  Our goal is to provide a platform for students to learn, grow,
                  and succeed in the tech industry.
                </p>
              </div>
              <Link
                to="/about"
                className="group mt-2 inline-flex min-h-[44px] items-center pt-2 text-sm font-semibold text-customGreen transition ease-in-out hover:text-customBlue"
              >
                Learn More
                <ArrowRightIcon className="ml-2 size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
