import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const FinanceForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    userId: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(formData.amount)) {
      newErrors.amount = "Amount must be a number";
    }
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.userId) newErrors.userId = "User ID is required";

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
      title: "",
      amount: "",
      type: "",
      category: "",
      userId: "",
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
        "http://localhost:5000/api/finances/reg",
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
    <div className="rounded-lg mx-auto bg-white text-black p-8 shadow-lg border mt-10 ">
      <h1 className="py-4 text-2xl font-bold tracking-tight text-black">
        Register Finance
      </h1>
      <p className="text-gray-500 pb-7">
        Fill in the form below to register a new finance.
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            onChange={handleChange}
            value={formData.title}
            className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
            id="title"
            placeholder="Enter finance title"
            type="text"
            name="title"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title}</p>
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
            placeholder="Enter amount"
            type="text"
            name="amount"
          />
          {errors.amount && (
            <p className="text-red-500 text-xs">{errors.amount}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="type"
          >
            Type
          </label>
          <select
            value={formData.type}
            name="type"
            onChange={handleChange}
            className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
            id="type"
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
        </div>
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="category"
          >
            Category
          </label>
          <input
            onChange={handleChange}
            value={formData.category}
            className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
            id="category"
            placeholder="Enter category"
            type="text"
            name="category"
          />
          {errors.category && (
            <p className="text-red-500 text-xs">{errors.category}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="userId"
          >
            User ID
          </label>
          <input
            onChange={handleChange}
            value={formData.userId}
            className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
            id="userId"
            placeholder="Enter user ID"
            type="text"
            name="userId"
          />
          {errors.userId && (
            <p className="text-red-500 text-xs">{errors.userId}</p>
          )}
        </div>
        <button
          className="w-full rounded-md bg-customBlue px-4 text-sm font-medium text-white py-3"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Register Finance"}
        </button>
      </form>
    </div>
  );
};

export default FinanceForm;
