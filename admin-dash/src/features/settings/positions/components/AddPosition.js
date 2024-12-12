import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import usePositionStore from "../../../../stores/positionStore";
import { showNotification } from "../../../common/headerSlice";

const AddPosition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register } = usePositionStore();

  const [formData, setFormData] = useState({
    id: "111222",
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (!id) return;
    // const fetchPositionData = async () => {
    //   setLoading(true);
    //   setError(null);
    //   try {
    //     const data = await fetchPositionById(id);
    //     setFormData(data || {});
    //   } catch (err) {
    //     setError("Failed to fetch position details");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchPositionData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(formData);
      dispatch(showNotification({ message: "Position added!", status: 1 }));

      navigate("/app/positions");
    } catch (err) {
      setError("Failed to save position details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {id ? "Update Position" : "Add Position"}
      </h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full`}
          disabled={loading}
        >
          {loading
            ? id
              ? "Updating..."
              : "Adding..."
            : id
            ? "Update Position"
            : "Add Position"}
        </button>
      </form>
    </div>
  );
};

export default AddPosition;
