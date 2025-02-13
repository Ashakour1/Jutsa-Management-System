import React, { useState } from "react";
import CandidateContent from "./CandidateContent";
import axios from "axios";
import { toast } from "sonner";

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    studentID: "",
    name: "",
    number: "",
    email: "",
    gpa: "",
    department: "",
    semester: "",
    className: "",
    failedCourse: "",
    financeDue: "",
    experience: "",
    campaignPlan: "",
  });

  const [errors, setErrors] = useState({});

  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // validation function

  const Validate = () => {
    const newErrors = {};

    if (!formData.studentID) newErrors.studentID = "Student must be required";

    if (!formData.name) newErrors.name = "name is required";

    if (!formData.number) {
      newErrors.number = "phone number is required ";
    } else if (!/^\d+$/.test(formData.number)) {
      newErrors.number = "Phone number must be numeric";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.gpa) {
      newErrors.gpa = "GPA is required";
    } else if (!/^\d(\.\d{1,2})?$/.test(formData.gpa)) {
      newErrors.gpa =
        "GPA must be numeric and can have at most 2 decimal places";
    } else if (parseFloat(formData.gpa) > 4.0) {
      newErrors.gpa = "GPA cannot be greater than 4.0";
    }

    if (!formData.department)
      newErrors.department = "must be choose department";

    if (!formData.semester) newErrors.semester = "semester must be choose";

    if (!formData.className) newErrors.className = "className must be choose";

    if (!formData.failedCourse)
      newErrors.failedCourse = "choose if you are failed yes or not no ";
    if (!formData.financeDue)
      newErrors.financeDue = "choose if you are finance Due yes or not no";

    if (!formData.experience || formData.experience.length < 50) {
      newErrors.experience = "Write minimum 50 characters";
    } else if (formData.experience.length > 150) {
      newErrors.experience = "You must write 150 characters only";
    }

    if (!formData.campaignPlan || formData.campaignPlan.length < 50) {
      newErrors.campaignPlan = "Write minimum 50 characters";
    } else if (formData.campaignPlan.length > 150) {
      newErrors.campaignPlan = "You must write 150 characters only";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!Validate()) {
      return;
    }

    // Send the form data to the server
    try {
      const response = await axios.post(
        "https://jutsa-management-system.vercel.app/api/candidates/",
        formData
      );
      toast.success(response.data.message);
      setFormData({
        studentID: "",
        name: "",
        number: "",
        email: "",
        gpa: "",
        department: "",
        semester: "",
        className: "",
        failedCourse: "",
        financeDue: "",
        experience: "",
        campaignPlan: "",
      });
    } catch (error) {
      // console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <main class="w-full rounded-lg mx-auto text-black p-8">
      <h1 class="my-4 text-3xl font-bold tracking-tight text-customBlue">
        President Candidate Application{" "}
      </h1>
      <p class="mb-4 text-gray-700">
        Fill out this form to apply as a candidate for the association president
        position.
      </p>
      <CandidateContent />
      <form class="space-y-6" onSubmit={handleSubmit}>
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
              value={formData.studentID}
              onChange={HandleChange}
            />

            {errors.studentID ? (
              <p className="text-red-500 text-xs">{errors.studentID}</p>
            ) : (
              <p class="text-gray-500 text-xs py-1">Enter your student ID.</p>
            )}
          </div>

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
              value={formData.name}
              onChange={HandleChange}
            />

            {errors.name ? (
              <p className="text-red-500 text-xs">{errors.name}</p>
            ) : (
              <p class="text-gray-500 text-xs py-1">
                Enter your full name as it appears on official documents.
              </p>
            )}
          </div>
          <div class="flex flex-col">
            <label class="mb-1 text-sm font-medium text-gray-700" for="number">
              Number
            </label>
            <input
              class="rounded-md border placeholder:text-gray-600 border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
              id="number"
              placeholder="615555555"
              type="tel"
              name="number"
              value={formData.number}
              onChange={HandleChange}
            />

            {errors.number ? (
              <p className="text-red-500 text-xs">{errors.number}</p>
            ) : (
              <p class="text-gray-500 text-xs py-2">
                Enter your phone number in the format 615555555
              </p>
            )}
          </div>
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
              value={formData.email}
              onChange={HandleChange}
            />

            {errors.email ? (
              <p className="text-red-500 text-xs">{errors.email}</p>
            ) : (
              <p class="text-gray-500 text-xs py-1">
                Enter your email address to receive updates.
              </p>
            )}
          </div>
        </div>
        {/* 2 */}
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
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
              name="department"
              value={formData.department}
              onChange={HandleChange}
            >
              <option value="">Select Department</option>
              <option value="Computer Application">Computer Application</option>
              <option value="Networking">Networking and Cyber Security</option>
              <option value="Multimedia">
                Multimedia and Animation Technology
              </option>
            </select>

            {errors.department ? (
              <p className="text-red-500 text-xs">{errors.department}</p>
            ) : (
              <p class="text-gray-500 text-xs py-1">
                Select your department from the list.
              </p>
            )}
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
              value={formData.semester}
              onChange={HandleChange}
            >
              <option value="">Semester</option>
              <option value="2">Semester 2</option>
              <option value="4">Semester 4</option>
              <option value="6">Semester 6</option>
            </select>

            {errors.semester ? (
              <p className="text-red-500 text-xs">{errors.semester}</p>
            ) : (
              <p class="text-gray-500 text-xs py-1">
                Select the semester you are currently in.
              </p>
            )}
          </div>{" "}
        </div>
        {/* shsh */}
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div class="flex flex-col">
            <label
              class="mb-1 text-sm font-medium text-gray-700"
              for="className"
            >
              Class Name
            </label>
            <input
              class="rounded-md border border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
              id="className"
              placeholder="CA000"
              type="text"
              name="className"
              value={formData.className}
              onChange={HandleChange}
            />
            <p class="text-gray-500 text-xs py-1">Enter your class name</p>
            {errors.className ? (
              <p className="text-red-500 text-xs">{errors.className}</p>
            ) : (
              <p class="text-gray-500 text-xs py-1">Enter your class name</p>
            )}
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
              value={formData.gpa}
              onChange={HandleChange}
            />

            {errors.gpa ? (
              <p className="text-red-500 text-xs">{errors.gpa}</p>
            ) : (
              <p className="text-red-500 text-xs">{errors.gpa}</p>
            )}
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
              id="failedCourse"
              name="failedCourse"
              value={formData.failedCourse}
              onChange={HandleChange}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {errors.failedCourse ? (
              <p className="text-red-500 text-xs">{errors.failedCourse}</p>
            ) : (
              <p class="text-gray-500 text-xs py-1">
                Have you failed any course before?
              </p>
            )}
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
              id="financeDue"
              name="financeDue"
              value={formData.financeDue}
              onChange={HandleChange}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {errors.financeDue ? (
              <p className="text-red-500 text-xs">{errors.financeDue}</p>
            ) : (
              <p class="text-gray-500 text-xs py-1">
                Have you paid all your fees?
              </p>
            )}
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
            value={formData.experience}
            minLength={50}
            maxLength={150}
            onChange={HandleChange}
          />
          {errors.experience ? (
            <p className="text-red-500 text-xs">{errors.experience}</p>
          ) : (
            <p class="text-gray-500 text-xs py-1">Write your experience</p>
          )}
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
            // minLength={50}
            // maxLength={150}
            value={formData.campaignPlan}
            onChange={HandleChange}
          />

          {errors.campaignPlan ? (
            <p className="text-red-500 text-xs">{errors.campaignPlan}</p>
          ) : (
            <p class="text-gray-500 py-1 text-xs">
              Enter your campaign plan if you are elected.
            </p>
          )}
        </div>
        <button
          class="w-full rounded-md bg-customBlue px-4 text-sm font-medium text-white py-3"
          type="submit"
        >
          Register
        </button>
      </form>
    </main>
  );
};

export default CandidateForm;
