import { useEffect, useState } from "react";
import { createFinance, updateFinance, getFinanceById } from "@/api/finance";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const FinanceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the finance ID from the URL params
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    userId: "",
  });
  const [errors, setErrors] = useState({});
  const [types] = useState(["Expense", "Income"]); // Example types, you can modify or fetch from API

  useEffect(() => {
    const fetchFinanceData = async () => {
      setLoading(true);
      try {
        const res = await getFinanceById(id);
        if (res) {
          setFormData({
            title: res.data.title || "",
            amount: res.data.amount || "",
            type: res.data.type || "",
            category: res.data.category || "",
            userId: res.data.userId || "",
          });
        } else {
          console.error("Finance data not found");
          toast.error("Finance data not found");
        }
      } catch (error) {
        toast.error("Failed to load finance data");
        console.error("Fetch Finance Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFinanceData();
    }
  }, [id]);

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

  const clearForm = () => {
    setFormData({
      title: "",
      amount: "",
      type: "",
      category: "",
      userId: "",
    });
    setErrors({});
  };

  const handleCreateFinance = async () => {
    try {
      await createFinance(formData);
      toast.success("Finance created successfully");
      console.log("Finance created successfully");
      clearForm();
      navigate("/dashboard/finance"); // Redirect back to finance list
    } catch (error) {
      console.error("Create Finance Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during creation"
      );
    }
  };

  const handleUpdateFinance = async () => {
    try {
      await updateFinance(id, formData);
      toast.success("Finance updated successfully");
      console.log("Finance updated successfully", formData);
      navigate("/dashboard/finance"); // Redirect back to finance list
    } catch (error) {
      console.error("Update Finance Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during update"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    if (id) {
      await handleUpdateFinance();
    } else {
      await handleCreateFinance();
    }

    setLoading(false);
  };

  return (
    <div className="w-[800px] rounded-lg mx-auto bg-white text-black p-8 shadow-lg">
      <h1 className="my-4 text-3xl font-bold tracking-tight text-black">
        {id ? "Update Finance" : "Register Finance"}
      </h1>
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
            onChange={handleChange}
            value={formData.type}
            className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
            id="type"
            name="type"
          >
            <option value="">Select type</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
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
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : id ? "Update Finance" : "Register Finance"}
        </button>
      </form>
    </div>
  );
};

export default FinanceForm;
