import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import AvatarCircles from "../ui/avatar-circles";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  // Avatar data with unique entries
  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="max-w-[1200px] md:pt-24 pt-10 mx-auto h-full flex flex-col">
        {/* button */}
        <motion.div
          className="z-10 flex  items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <motion.div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Join Our Community</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </motion.div>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          className="flex flex-col md:text-center text-start sm:text-center md:px-4 px-6 justify-center md:items-center items-start sm:items-center py-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="md:text-5xl sm:text-2xl text-[20px] max-w-5xl font-semibold text-customBlue">
              Where Collaboration Builds the Future
            </h1>
            <h1 className="md:text-5xl sm:text-2xl text-[20px] max-w-[800px] font-semibold text-customBlue">
              of Innovation at <span className="text-customGreen">JUTSA</span>
            </h1>
          </motion.div>
          <motion.p
            className="md:text-xl text-base max-w-2xl pt-2 md:pt-4 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            At JUTSA, IT students collaborate, innovate, and grow together,
            shaping the future of technology.
          </motion.p>
        </motion.div>

        {/* Avatar Circles */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <AvatarCircles
            numPeople={5000}
            avatarUrls={avatars}
            className="items-center justify-center"
          />
        </motion.div>

        {/* <motion.div
          className="flex gap-4 items-center justify-center py-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button className="px-6 py-3 rounded-md bg-customBlue text-white font-medium text-base hover:bg-blue-600 transition-colors duration-300">
            Join Us
          </motion.button>
          <motion.button className="px-6 py-3 rounded-md bg-customGreen text-white font-medium text-base hover:bg-green-600 transition-colors duration-300">
            Learn More
          </motion.button>
        </motion.div> */}

        {/* Image Section */}
        <motion.div
          className="py-10 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-0 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {mounted && (
              <>
                <motion.img
                  src="/hero-5.jpg"
                  alt="Students collaborating"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-[300px] shadow-lg"
                />
                <motion.img
                  src="/hero-2.jpg"
                  alt="Student presentation"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-[300px] shadow-lg"
                />
                <motion.img
                  src="/hero-3.jpg"
                  alt="Campus event"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-[300px] shadow-lg"
                />
                <motion.img
                  src="/hero-4.jpg"
                  alt="Student diversity"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-[300px] shadow-lg"
                />
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default HeroSection;
