import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import AvatarCircles from "../ui/avatar-circles";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { ArrowRightIcon, CalendarDays, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import DotPattern from "../ui/dot-pattern";
import { Link } from "react-router-dom";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  const avatars = [
    { imageUrl: "/hop.jpeg", profileUrl: "#" },
    { imageUrl: "/cdo.jpg", profileUrl: "https://abdishakur.reliatrusty.com/" },
    { imageUrl: "/hof.jpg", profileUrl: "#" },
    { imageUrl: "/vp.jpg", profileUrl: "#" },
    { imageUrl: "/president.jpg", profileUrl: "#" },
    { imageUrl: "/cdo2.jpg", profileUrl: "#" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative">
      <Helmet>
        <title>JUTSA — Jamhuriya University Tech Student Association</title>
      </Helmet>

      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-emerald-50/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-10%,rgba(14,16,63,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_80%_60%,rgba(43,183,123,0.08),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.35]">
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className="h-full w-full fill-neutral-400/70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-28 pb-16 md:pb-24 md:pt-32">
        <motion.div
          className="flex flex-col items-center text-center container mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Link
              to="/about"
              className={cn(
                "group inline-flex rounded-full border border-customBlue/10 bg-white/80 shadow-sm shadow-customBlue/5 backdrop-blur-sm",
                "transition-all duration-300 hover:border-customGreen/25 hover:shadow-md hover:shadow-customGreen/10"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-customBlue transition ease-out hover:text-customBlue">
                <span className="opacity-90">Join our community</span>
                <ArrowRightIcon className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </Link>
          </motion.div>

          <motion.h1
            className="mt-8 text-balance text-3xl sm:text-4xl md:text-6xl lg:text-[4rem] font-semibold tracking-tight text-customBlue leading-[1.12]"
            variants={item}
          >
            Where collaboration builds the future of innovation at{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-customGreen via-emerald-500 to-customGreen bg-[length:200%_auto] bg-clip-text text-transparent">
                JUTSA
              </span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-2 rounded-full bg-gradient-to-r from-customGreen/25 via-emerald-400/35 to-customGreen/25 blur-[2px]"
                aria-hidden
              />
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-4xl text-base md:text-lg leading-relaxed text-slate-600"
            variants={item}
          >
            IT students at Jamhuriya University collaborate, build, and grow
            together—projects, events, and a community that moves technology
            forward on campus.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
            variants={item}
          >
            <Link
              to="/management"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-customBlue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-customBlue/25 transition hover:bg-[#12155a] hover:shadow-xl hover:shadow-customBlue/30"
            >
              Meet the team
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Link
                to="/it-day"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-customBlue/15 bg-white/90 px-5 py-2.5 text-sm font-medium text-customBlue shadow-sm transition hover:border-customGreen/30 hover:bg-emerald-50/50"
              >
                <CalendarDays className="h-4 w-4 text-customGreen" aria-hidden />
                Faculty Day
              </Link>
              <Link
                to="/sports"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-customBlue/15 bg-white/90 px-5 py-2.5 text-sm font-medium text-customBlue shadow-sm transition hover:border-customGreen/30 hover:bg-emerald-50/50"
              >
                <Trophy className="h-4 w-4 text-customGreen" aria-hidden />
                Sports tournament
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            variants={item}
          >
            <AvatarCircles numPeople={7005} avatarUrls={avatars} />
            <span className="text-sm font-medium text-slate-500 max-w-[200px] sm:max-w-none sm:text-left">
              Thousands of students share our mission—connect in events and projects.
            </span>
          </motion.div>
        </motion.div>

        {/* Hero images — two panels */}
        {mounted && (
          <motion.div
            className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1100px] mx-auto"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div className="rounded-2xl overflow-hidden ring-1 ring-black/[0.06] shadow-xl shadow-slate-900/10 min-h-[240px] md:min-h-[320px]">
              <img
                src="/hero-5.jpg"
                alt="JUTSA students collaborating"
                width={900}
                height={600}
                className="h-full w-full min-h-[240px] md:min-h-[320px] object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden ring-1 ring-black/[0.06] shadow-xl shadow-slate-900/10 min-h-[240px] md:min-h-[320px]">
              <img
                src="/hero-2.jpg"
                alt="Student presentation at JUTSA"
                width={900}
                height={600}
                className="h-full w-full min-h-[240px] md:min-h-[320px] object-cover"
              />
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default HeroSection;
