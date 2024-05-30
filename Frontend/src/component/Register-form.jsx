import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    semester: "",
    skill: "",
    className: "",
    type: "",
    projectName: "",
    technologies: "",
  });

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const clearText = () => {
    setFormData({
      name: "",
      number: "",
      email: "",
      semester: "",
      skill: "",
      className: "",
      type: "",
      projectName: "",
      technologies: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDate = (date) => {
      const d = date.getDate();
      const m = date.getMonth() + 1; // Months are zero-based
      const y = date.getFullYear();
      return `${d}-${m}-${y}`;
    };

    // Get the current date and format it
    const currentDate = formatDate(new Date());
    try {
      if (currentDate > "6-6-2024") {
        toast.warning("This form is currently not open for registration.");
      } else {
        const response = await fetch(
          "https://159.100.6.253:5000/api/competitors/",
          formData
        );
        toast.success("Registration successful");
        clearText();
        setLoading(false);
        // console.log(response.data);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 py-20 px-4">
      <div className="w-[800px] rounded-lg mx-auto bg-white text-black p-8 shadow-lg ">
        <h1 className="my-4 text-3xl font-bold tracking-tight text-black">
          Registration
        </h1>
        <p className="mb-4 text-gray-700">
          {" "}
          Please fill in the form below to register for IT-DAY
        </p>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700 "
                htmlFor="name"
              >
                Name
              </label>
              <input
                onChange={handleChange}
                value={formData.name}
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="name"
                placeholder="Enter your name"
                type="text"
                name="name"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700 "
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                onChange={handleChange}
                value={formData.number}
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary  "
                id="phone"
                placeholder="Enter your phone number"
                type="tel"
                name="number"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700 "
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                value={formData.email}
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary  "
                id="email"
                placeholder="Enter your email"
                type="email"
                name="email"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700 "
                htmlFor="semester"
              >
                Semester
              </label>
              <select
                value={formData.semester}
                onChange={handleChange}
                className="rounded-md border  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="semester"
                placeholder="Enter your semester"
                type="number"
                name="semester"
              >
                <option value>Select Semester</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700 "
                htmlFor="class-name"
              >
                Class Name
              </label>
              <input
                onChange={handleChange}
                value={formData.className}
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary   "
                id="class-name"
                placeholder="Enter your class name"
                type="text"
                name="className"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700 "
                htmlFor="type"
              >
                Type
              </label>
              <select
                value={formData.type}
                name="type"
                onChange={handleChange}
                className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary  "
                id="type"
                placeholder="Enter your type"
                type="text"
              >
                <option value>Select Type</option>
                <option value="Network">Network</option>
                <option value="webdevelopment">Web Development</option>
                <option value="Mobile Application">Mobile Application</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="typing">Typing </option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700 "
                htmlFor="skill"
              >
                Skill
              </label>
              <input
                value={formData.skill}
                onChange={handleChange}
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary  "
                id="skill"
                placeholder="Enter your skill"
                type="text"
                name="skill"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700 "
                htmlFor="project-name"
              >
                Project Name
              </label>
              <input
                value={formData.projectName}
                onChange={handleChange}
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary "
                id="project-name"
                placeholder="Enter your project name"
                type="text"
                name="projectName"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 text-sm font-medium text-gray-700 "
              htmlFor="technologies"
            >
              Technologies
            </label>
            <input
              value={formData.technologies}
              onChange={handleChange}
              name="technologies"
              className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary  "
              id="technologies"
              placeholder="Enter the technologies used"
              type="text"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full rounded-md bg-customBlue px-4  text-sm font-medium text-white  py-3"
            type="submit"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Register Now"
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
