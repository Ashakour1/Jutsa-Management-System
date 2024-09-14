import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSportById, updateSport, createSport } from "@/api/sport";
import { toast } from "sonner";

const SportsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the sport ID from the URL params

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    monitorName: "",
    monitorNumber: "",
    className: "",
    description: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSportData = async () => {
      setLoading(true);
      try {
        const res = await getSportById(id);
        if (res) {
          setFormData({
            monitorName: res.data.monitorName || "",
            monitorNumber: res.data.monitorNumber || "",
            className: res.data.className || "",
            description: res.data.description || "",
            amount: res.data.amount || "",
          });
        } else {
          console.error("Sport data not found");
          toast.error("Sport data not found");
        }
      } catch (error) {
        toast.error("Failed to load sport data");
        console.error("Fetch Sport Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSportData();
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};

    if (!formData.monitorName)
      newErrors.monitorName = "Monitor Name is required";
    if (!formData.monitorNumber)
      newErrors.monitorNumber = "Monitor Number is required";
    if (!formData.className) newErrors.className = "Class Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.amount) newErrors.amount = "Amount is required";

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
      monitorName: "",
      monitorNumber: "",
      className: "",
      description: "",
      amount: "",
    });
    setErrors({});
  };

  const handleCreateSport = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.post(
        "http://localhost:5000/api/sports",
        formData
=======
      await createSport(formData);
      toast.success("Sport created successfully");
      clearForm();
      navigate("/dashboard/sports");
    } catch (error) {
      console.error("Create Sport Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during creation"
>>>>>>> ccec6920188afc6060bb699c9c2cbba90af0e140
      );
    }
  };

  const handleUpdateSport = async () => {
    try {
      await updateSport(id, formData);
      toast.success("Sport updated successfully");
      navigate("/dashboard/sports");
    } catch (error) {
      console.error("Update Sport Error:", error);
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
      await handleUpdateSport();
    } else {
      await handleCreateSport();
    }

    setLoading(false);
  };

  return (
    <div className="w-[800px] rounded-lg mx-auto bg-white text-black p-8 shadow-lg">
      <h1 className="my-4 text-3xl font-bold tracking-tight text-black">
        {id ? "Update Sport" : "Register Sport"}
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            placeholder="Enter the monitor's number"
            type="text"
            name="monitorNumber"
          />
          {errors.monitorNumber && (
            <p className="text-red-500 text-xs">{errors.monitorNumber}</p>
          )}
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
            placeholder="Enter sport description"
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
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : id ? "Update Sport" : "Register Sport"}
        </button>
      </form>
    </div>
  );
};

export default SportsForm;
