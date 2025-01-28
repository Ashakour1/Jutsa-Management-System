import React from "react";
import CandidateContent from "./CandidateContent";

const CandidateForm = () => {
  return (
    <main class="flex min-h-screen items-center justify-center  px-4 ">
      <div class="w-[800px] rounded-lg mx-auto text-black p-8 border">
        <h1 class="my-4 text-3xl font-bold tracking-tight text-customBlue">
          President Candidate Application{" "}
        </h1>
        <p class="mb-4 text-gray-700">
          Fill out this form to apply as a candidate for the association
          president position.
        </p>
        <CandidateContent />
        <form class="space-y-6">
          <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div class="flex flex-col">
              <label class="mb-1 text-sm font-medium text-gray-700" for="name">
                Name
              </label>
              <input
                class="rounded-md border placeholder:text-gray-600 border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="name"
                placeholder="John Doe"
                type="text"
                name="name"
              />
              <p class="text-gray-500 text-xs py-1">
                Enter your full name as it appears on official documents.
              </p>
            </div>
            <div class="flex flex-col">
              <label
                class="mb-1 text-sm font-medium text-gray-700"
                for="number"
              >
                Number
              </label>
              <input
                class="rounded-md border placeholder:text-gray-600 border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="number"
                placeholder="615555555"
                type="tel"
                name="number"
              />
              <p class="text-gray-500 text-xs py-2">
                Enter your phone number in the format 615555555
              </p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div class="flex flex-col">
              <label class="mb-1 text-sm font-medium text-gray-700" for="email">
                Email
              </label>
              <input
                class="rounded-md border placeholder:text-gray-600 border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="email"
                placeholder="johndoe@gmail.com"
                type="email"
                name="email"
              />
              <p class="text-gray-500 text-xs py-1">
                Enter your email address to receive updates.
              </p>
            </div>
            <div class="flex flex-col">
              <label
                class="mb-1 text-sm font-medium text-gray-700"
                for="department"
              >
                Department
              </label>
              <select
                class="rounded-md border p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="department"
                name="semester"
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
              <p class="text-gray-500 text-xs py-1">
                Select your department from the list.
              </p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div class="flex flex-col">
              <label
                class="mb-1 text-sm font-medium text-gray-700"
                for="studentID"
              >
                Student ID
              </label>
              <input
                class="rounded-md border placeholder:text-gray-600 border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="studentID"
                placeholder="C1200000"
                type="text"
                name="studentID"
              />
              <p class="text-gray-500 text-xs py-1">Enter your student ID.</p>
            </div>
            <div class="flex flex-col">
              <label
                class="mb-1 text-sm font-medium text-gray-700"
                for="semester"
              >
                Semester
              </label>
              <select
                class="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="semester"
                name="semester"
              >
                <option value="">Semester</option>
                <option value="2">Semester 2</option>
                <option value="4">Semester 4</option>
                <option value="6">Semester 6</option>
              </select>

              <p class="text-gray-500 text-xs py-1">
                Select the semester you are currently in.
              </p>
            </div>
            <div class="flex flex-col">
              <label
                class="mb-1 text-sm font-medium text-gray-700"
                for="classname"
              >
                Class Name
              </label>
              <input
                class="rounded-md border border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="classname"
                placeholder="CA000"
                type="text"
                name="classname"
              />
              <p class="text-gray-500 text-xs py-1">Enter your class name</p>
            </div>
            <div class="flex flex-col">
              <label class="mb-1 text-sm font-medium text-gray-700" for="gpa">
                GPA
              </label>
              <input
                class="rounded-md border border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="gpa"
                placeholder="3.0"
                type="text"
                name="gpa"
              />
              <p class="text-gray-500 text-xs py-1">
                Enter your current GPA (minimum of 3.0)
              </p>
            </div>

            <div class="flex flex-col">
              <label
                class="mb-1 text-sm font-medium text-gray-700"
                for="semester"
              >
                Have you failed any course before?{" "}
              </label>
              <select
                class="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="semester"
                name="semester"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <p class="text-gray-500 text-xs py-1">
                Have you failed any course before?
              </p>
            </div>
            <div class="flex flex-col">
              <label
                class="mb-1 text-sm font-medium text-gray-700"
                for="semester"
              >
                No Finance Due
              </label>
              <select
                class="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="semester"
                name="semester"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <p class="text-gray-500 text-xs py-1">
                Have you paid all your fees?
              </p>
            </div>
          </div>

          <div class="flex flex-col">
            <label
              class="mb-1 text-sm font-medium text-gray-700"
              for="experience"
            >
              Previous Leadership Experience
            </label>
            <textarea
              class="rounded-md border border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
              id="experience"
              rows={5}
              cols={50}
              placeholder="Describe your your previous Leadership roles and experience"
              name="experience"
            />
            <p class="text-gray-500 py-1 text-xs">
              Enter your experience in the association
            </p>
          </div>
          <div class="flex flex-col">
            <label
              class="mb-1 text-sm font-medium text-gray-700"
              for="campaignPlan"
            >
              Campaign Plan
            </label>
            <textarea
              class="rounded-md border border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
              id="campaignPlan"
              rows={7}
              cols={50}
              placeholder="Enter your campaignPlan"
              name="campaignPlan"
            />
            <p class="text-gray-500 py-1 text-xs">
              Enter your campaign plan if you are elected.
            </p>
          </div>
          <button
            class="w-full rounded-md bg-customBlue px-4 text-sm font-medium text-white py-3"
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
