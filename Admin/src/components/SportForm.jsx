import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const SportsForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    monitorName: "",
    monitorNumber: "",
    className: "",
    description: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.monitorName)
      newErrors.monitorName = "Monitor Name is required";
    if (!formData.monitorNumber) {
      newErrors.monitorNumber = "Monitor Number is required";
    } else if (!/^\d+$/.test(formData.monitorNumber)) {
      newErrors.monitorNumber = "Monitor Number must be numeric";
    }
    if (!formData.className) newErrors.className = "Class Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(formData.amount)) {
      newErrors.amount = "Amount must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const clearText = () => {
    setFormData({
      monitorName: "",
      monitorNumber: "",
      className: "",
      description: "",
      amount: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sports",
        formData
      );
      toast.success(response.data.message);
      clearText();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 py-20 px-4">
      <div className="w-[800px] rounded-lg mx-auto bg-white text-black p-8 shadow-lg">
        <h1 className="my-4 text-3xl font-bold tracking-tight text-black">
          Register a Sport
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="monitorName"
              >
                Monitor Name
              </label>
              <input
                onChange={handleChange}
                value={formData.monitorName}
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="monitorName"
                placeholder="Enter the monitor's name"
                type="text"
                name="monitorName"
              />
              {errors.monitorName && (
                <p className="text-red-500 text-xs">{errors.monitorName}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="monitorNumber"
              >
                Monitor Number
              </label>
              <input
                onChange={handleChange}
                value={formData.monitorNumber}
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="monitorNumber"
                placeholder="Enter the monitor's phone number"
                type="tel"
                name="monitorNumber"
              />
              {errors.monitorNumber && (
                <p className="text-red-500 text-xs">{errors.monitorNumber}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 text-sm font-medium text-gray-700"
              htmlFor="className"
            >
              Class Name
            </label>
            <input
              onChange={handleChange}
              value={formData.className}
              className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
              id="className"
              placeholder="Enter the class name"
              type="text"
              name="className"
            />
            {errors.className && (
              <p className="text-red-500 text-xs">{errors.className}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              onChange={handleChange}
              value={formData.description}
              className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
              id="description"
              placeholder="Enter a description of the sport"
              name="description"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 text-sm font-medium text-gray-700"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              onChange={handleChange}
              value={formData.amount}
              className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
              id="amount"
              placeholder="Enter the amount"
              type="text"
              name="amount"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs">{errors.amount}</p>
            )}
          </div>
          <button
            className="w-full rounded-md bg-customBlue px-4 text-sm font-medium text-white py-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default SportsForm;
