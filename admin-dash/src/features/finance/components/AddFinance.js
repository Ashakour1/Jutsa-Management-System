import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFinanceStore from "../../../stores/financeStore";
import { showNotification } from "../../common/headerSlice";

const AddFinance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchFinanceById, registerFinance, updateFinance } = useFinanceStore();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    userId: "673f75687c47f031e23e0dd3", // Example userId, replace dynamically if needed
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinanceData = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);
      try {
        const fetchedData = await fetchFinanceById(id); // Updated to use returned data directly
        setFormData({
          title: fetchedData.title || "",
          amount: fetchedData.amount || "",
          type: fetchedData.type || "",
          category: fetchedData.category || "",
          userId: fetchedData.userId || "673f75687c47f031e23e0dd3", // Default userId
        });
      } catch (err) {
        console.error("Error fetching finance by ID:", err); // Debugging log
        setError(err.message || "Failed to fetch finance details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, [id, fetchFinanceById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await updateFinance(id, formData);
        dispatch(
          showNotification({ message: "Finance record updated!", status: 1 })
        );
      } else {
        await registerFinance(formData);
        dispatch(
          showNotification({ message: "New Finance Added!", status: 1 })
        );
      }
      navigate("/app/finance"); // Redirect to finance list
    } catch (err) {
      console.error("Error submitting form:", err); // Debugging log
      setError(err.message || "Failed to process request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Update Finance" : "Add Finance"}
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? (id ? "Updating..." : "Adding...") : id ? "Update Finance" : "Add Finance"}
        </button>
      </form>
    </div>
  );
};

export default AddFinance;