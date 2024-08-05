import React from "react";

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-[465px] p-10 bg-stone-200 border rounded shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-start">Signup</h2>
        <p className="mb-6 text-start">Please Signup into your Account</p>
        <form>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-3 text-sm border rounded-md focus:outline-none border-gray-600 focus:ring-2 focus:ring-gray-600 focus:border-transparent bg-stone-200"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-3 text-sm border rounded-md focus:outline-none border-gray-600 focus:ring-2 focus:ring-gray-600 focus:border-transparent bg-stone-200"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 border-gray-600  focus:ring-gray-600 focus:border-transparent bg-stone-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
