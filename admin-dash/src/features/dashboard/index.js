import DashboardStats from "./components/DashboardStats";
import axios from "axios";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const statsData = [
  {
    title: "New Users",
    value: "34.7k",
    icon: <UserGroupIcon className="w-8 h-8" />,
    description: "↗︎ 2300 (22%)",
  },
  {
    title: "Total Sales",
    value: "$34,545",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "Current month",
  },
  {
    title: "Pending Leads",
    value: "450",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "50 in hot leads",
  },
  {
    title: "Active Users",
    value: "5.6k",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "↙ 300 (18%)",
  },
];

const formNames = ["facultyForm", "sportsForm", "presidentForm"];

function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formVisibility, setFormVisibility] = useState({});

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    const fetchAllVisibilities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/form");
        setFormVisibility(response.data);
      } catch (error) {
        console.error("Error fetching form visibility:", error);
      }
    };
    fetchAllVisibilities();
  }, []);

  const toggleForm = async (formName, status) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/form/${formName}`,
        { showForm: status }
      );
      setFormVisibility((prev) => ({ ...prev, [formName]: status }));
      dispatch(
        showNotification({
          message: response.data.message,
          status: 1,
        })
      );
    } catch (error) {
      console.error(`Error toggling visibility for ${formName}:`, error);
    }
  };

  const updateDashboardPeriod = (newRange) => {
    dispatch(
      showNotification({
        message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
        status: 1,
      })
    );
  };

  return (
    <>
      <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

      <div className="grid lg:grid-cols-4 mt-4 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => (
          <DashboardStats key={k} {...d} colorIndex={k} />
        ))}
      </div>

      <div className="mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Form Visibility Management</h2>
        <div className="space-y-4">
          {formNames.map((formName) => (
            <div
              key={formName}
              className="flex items-center justify-between border-b pb-2"
            >
              <span className="capitalize font-medium text-gray-700">
                {formName.replace("Form", " Form")}
              </span>
              <div className="flex items-center gap-4">
                <span
                  className={`font-semibold ${
                    formVisibility[formName] ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formVisibility[formName] ? "Enabled" : "Disabled"}
                </span>
                <button
                  onClick={() => toggleForm(formName, true)}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Enable
                </button>
                <button
                  onClick={() => toggleForm(formName, false)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Disable
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
