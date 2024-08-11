import React from "react";

const SignupForm = () => {
  return (
    <div className="w-full p-7 rounded border ">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold text-customBlue ">Sign Up</h1>
        <p className="text-sm text-gray-500">
          Enter your details to create a new account
        </p>
      </div>
      <div className="">
        <form>
          <div className="flex flex-col gap-2 pt-4">
            <label className="text-black text-sm font-medium">Name</label>
            <input
              className="w-full p-2 border text-sm rounded"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <label className="text-black text-sm font-medium">Email</label>
            <input
              className="w-full p-2 border text-sm rounded"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-2 pt-3">
            <label className="text-black text-sm font-medium ">Password</label>
            <input
              className="w-full p-2 border text-sm rounded"
              type="password"
              placeholder="Password"
            />
          </div>
          <button className="w-full bg-customBlue font-medium p-2 rounded mt-8 text-white">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
