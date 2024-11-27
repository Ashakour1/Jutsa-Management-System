import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const ContactForm = () => {
  return (
    <div>
      <form class="space-y-7" onSubmit="handleSubmit">
        <div class="flex flex-col space-y-2">
          <label class="mb-1 text-sm font-medium text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            class="rounded-md border border-gray-300  p-3 text-sm text-black focus:border-primary focus:ring-primary focus:outline-customGreen"
            id="name"
            placeholder="Enter your name"
            type="text"
            name="name"
            required
          />
        </div>

        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div class="flex flex-col space-y-2">
            <label
              class="mb-1 text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              class="rounded-md border border-gray-300  p-3 text-sm text-black focus:border-primary focus:ring-primary focus:outline-customGreen"
              id="email"
              placeholder="@example.jutsa.com"
              type="email"
              name="email"
              required
            />
          </div>

          <div class="flex flex-col space-y-2">
            <label
              class="mb-1 text-sm font-medium text-gray-700"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              class="rounded-md border border-gray-300  p-3 text-sm text-black focus:border-primary focus:ring-primary focus:outline-customGreen"
              id="subject"
              placeholder="E.g (Support, Feedback, etc.)"
              type="text"
              name="subject"
              required
            />
          </div>
        </div>

        <div class="flex flex-col space-y-2">
          <label
            class="mb-1 text-sm font-medium text-gray-700"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            class="rounded-md border border-gray-300  p-3 text-sm text-black focus:border-primary focus:ring-primary resize-none focus:outline-customGreen"
            id="message"
            placeholder="eg (i wanna seminar about tech)"
            name="message"
            rows="6"
            required
          ></textarea>
        </div>

        <button
          class="w-full rounded-md bg-black px-4 text-sm font-medium text-white py-3"
          type="submit"
        >
          Send Message
        </button>
      </form>
      <div className=" flex justify-between pt-10 border-t border-gray-200">
        <p className="text-gray-600 mb-4">Connect with us on social media:</p>
        <div className="flex space-x-4">
          <a href="#" className="text-customBlue-600 hover:text-customGreen">
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-customBlue-600 hover:text-customGreen">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-customBlue-600 hover:text-customGreen">
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
