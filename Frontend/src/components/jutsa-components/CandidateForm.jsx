import React from "react";

const CandidateForm = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 border">
      <div className="w-full max-w-[800px] rounded-lg mx-auto text-black p-4 sm:p-8">
        <h1 className="my-4 text-2xl sm:text-3xl font-bold tracking-tight text-customBlue">
          President Candidate Application
        </h1>
        <p className="mb-4 text-gray-700">
          Fill out this form to apply as a candidate for the association
          president position.
        </p>

        {/* Eligibility Section */}
     

        {/* Form Section */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="rounded-md border placeholder:text-gray-600 border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="name"
                placeholder="John Doe"
                type="text"
                name="name"
              />
              <p className="text-gray-500 text-xs py-1">
                Enter your full name as it appears on official documents.
              </p>
            </div>
            {/* Number */}
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="number"
              >
                Number
              </label>
              <input
                className="rounded-md border placeholder:text-gray-600 border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="number"
                placeholder="615555555"
                type="tel"
                name="number"
              />
              <p className="text-gray-500 text-xs py-2">
                Enter your phone number in the format 615555555
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="rounded-md border placeholder:text-gray-600 border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="email"
                placeholder="johndoe@gmail.com"
                type="email"
                name="email"
              />
              <p className="text-gray-500 text-xs py-1">
                Enter your email address to receive updates.
              </p>
            </div>
            {/* Department */}
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="department"
              >
                Department
              </label>
              <select
                className="rounded-md border p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="department"
                name="department"
              >
                <option value="">Select Department</option>
                <option value="Computer Application">
                  Computer Application
                </option>
                <option value="Networking">
                  Networking and Cyber Security
                </option>
                <option value="Multimedia">
                  Multimedia and Animation Technology
                </option>
              </select>
              <p className="text-gray-500 text-xs py-1">
                Select your department from the list.
              </p>
            </div>
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="studentID"
              >
                Student ID
              </label>
              <input
                className="rounded-md border placeholder:text-gray-600 border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="studentID"
                placeholder="C1200000"
                type="text"
                name="studentID"
              />
              <p className="text-gray-500 text-xs py-1">
                Enter your student ID.
              </p>
            </div>
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="semester"
              >
                Semester
              </label>
              <select
                className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="semester"
                name="semester"
              >
                <option value="">Semester</option>
                <option value="2">Semester 2</option>
                <option value="4">Semester 4</option>
                <option value="6">Semester 6</option>
              </select>
              <p className="text-gray-500 text-xs py-1">
                Select the semester you are currently in.
              </p>
            </div>
            {/* Additional Inputs */}
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="classname"
              >
                Class Name
              </label>
              <input
                className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="classname"
                placeholder="CA000"
                type="text"
                name="classname"
              />
              <p className="text-gray-500 text-xs py-1">
                Enter your class name.
              </p>
            </div>
            {/* GPA */}
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="gpa"
              >
                GPA
              </label>
              <input
                className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="gpa"
                placeholder="3.0"
                type="text"
                name="gpa"
              />
              <p className="text-gray-500 text-xs py-1">
                Enter your current GPA (minimum of 3.0).
              </p>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="experience"
              >
                Previous Leadership Experience
              </label>
              <textarea
                className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="experience"
                rows={5}
                placeholder="Describe your previous leadership roles and experience."
                name="experience"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="campaignPlan"
              >
                Campaign Plan
              </label>
              <textarea
                className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="campaignPlan"
                rows={7}
                placeholder="Enter your campaign plan."
                name="campaignPlan"
              />
            </div>
          </div>

          <button
            className="w-full rounded-md bg-customBlue px-4 py-3 text-sm font-medium text-white"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
};

export default CandidateForm;
