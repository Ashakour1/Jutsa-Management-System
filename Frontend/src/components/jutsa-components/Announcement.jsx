import React from "react";
import { Link } from "react-router-dom";

const Announcement = () => {
  return (
    <div className="bg-customGreen px-4 py-3 text-white">
      <p className="text-center text-sm font-medium">
        The presidential candidate application is open.{" "}
        <Link to="/candidate-reg" className="inline-block underline">
          Register Now
        </Link>
      </p>
    </div>
  );
};

export default Announcement;
