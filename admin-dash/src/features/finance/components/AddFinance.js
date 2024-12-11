import { useNavigate } from "react-router-dom";
import TitleCard from "../../../components/Cards/TitleCard";
import useFinanceStore from "../../../stores/financeStore";
import { useState } from "react";

function AddFinance() {
  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    type: "",
    category: "", // Default value changed to empty string
    userId: "673f75687c47f031e23e0dd3",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { financeDetails, createFinanceDetails } = useFinanceStore();

  console.log("financeDetails" + financeDetails);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.amount ||
      !formData.type ||
      !formData.category
    ) {
      alert("Please fill in all fields.");
      return;
    }

    console.log(formData);
    createFinanceDetails(formData);
  };

  return (
    <>
      <TitleCard topMargin="mt-2">
        <div className="w-full rounded-lg mx-auto text-black p-8">
          <h1 className="my-4 text-3xl font-bold tracking-tight text-black">
            Finance Registration
          </h1>
          <p className="mb-4 text-gray-700">
            Please fill in the form below to add new finance data.
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
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="title"
                placeholder="Enter the title"
                type="text"
                name="title"
                onChange={handleChange}
                value={formData.title}
              />
            </div>

            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="amount"
                placeholder="Enter the amount"
                type="number"
                name="amount"
                onChange={handleChange}
                value={formData.amount}
              />
            </div>

            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="type"
              >
                Type
              </label>
              <select
                name="type"
                className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="type"
                onChange={handleChange}
                value={formData.type}
              >
                <option value="">Select Type</option>
                <option value="active">Income</option>
                <option value="inactive">Expense</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="category"
              >
                Category
              </label>
              <select
                name="category"
                className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="category"
                onChange={handleChange}
                value={formData.category}
              >
                <option value="">Select Category</option>
                <option value="itday">IT-DAY</option>
                <option value="jday">JDAY</option>
                <option value="sports">Sports</option>
              </select>
            </div>

            <button
              className="w-full rounded-md bg-black px-4 text-sm font-medium text-white py-3"
              type="submit"
            >
              Add Finance
            </button>
          </form>
        </div>
      </TitleCard>
    </>
  );
}

export default AddFinance;
