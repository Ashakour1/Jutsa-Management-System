import React from "react";
import { Link } from "react-router-dom";

const Announcement = () => {
  return (
    <div className="bg-customGreen px-4 py-3 text-white">
      <p className="text-center text-sm font-medium">
        Big things ahead. Stay tuned!
        {/* <Link to="/register" className="inline-block underline">
          Registration
        </Link> */}
      </p>
    </div>
  );
};

export default Announcement;
