import { useEffect, useState } from "react";
import { ArrowRight, X, Clock } from "lucide-react";

const Announcement = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 14,
    minutes: 23,
    seconds: 2,
  });
  if (!isVisible) return null;

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       // Add actual countdown logic here
  //       return prev;
  //     });
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div className="bg-customGreen flex  text-white px-4 py-3">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-customBlue  px-2 py-1 rounded text-sm font-medium">
            OPEN NOW
          </span>
          <span className="text-sm font-medium">
            Presidential Election Registration
          </span>
          {/* <div className="text-sm font-medium">
            {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
          </div> */}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <a
          href="/candidate-reg"
          className="group flex items-center space-x-2 bg-customBlue hover:bg-emerald-500 border-customBlue border text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
        >
          <span>Register Now</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>

        <button
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Close announcement"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Announcement;
