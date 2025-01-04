import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";
import axios from "axios";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserChannels from "./components/UserChannels";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import DoughnutChart from "./components/DoughnutChart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
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

function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    // Fetch current form visibility status from API
    const fetchFormVisibility = async () => {
      try {
        const response = await axios.get(
          "https://jutsa-api.vercel.app/api/form"
        );
        const data = response.data;
        setFormVisible(data.showForm);
      } catch (error) {
        console.error("Error fetching form visibility:", error);
      }
    };

    fetchFormVisibility();
  }, []);

  const toggleFormVisibility = async (status) => {
    try {
      const response = await axios.post(
        "https://jutsa-api.vercel.app/api/form",
        {
          showForm: status,
        }
      );

      console.log(response.data.message);
      setFormVisible(status);
    } catch (error) {
      console.error("Error toggling form visibility:", error);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    // If user is not authenticated (either no user or no token), redirect to login
    if (!user) {
      console.log("users" + user);
      navigate("/login");
    }
  }, [user, navigate]); // Re-run the effect if user state changes

  // if (!user && !localStorage.getItem("token")) {
  //   return <div>Loading...</div>; // Optionally show loading state
  // }

  const updateDashboardPeriod = (newRange) => {
    // Dashboard range changed, write code to refresh your values
    dispatch(
      showNotification({
        message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
        status: 1,
      })
    );
  };

  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      <div>
        <h2>Manage Form Visibility</h2>
        <button onClick={() => toggleFormVisibility(true)}>Enable Form</button>
        <button onClick={() => toggleFormVisibility(false)}>
          Disable Form
        </button>
        <p>The form is {formVisible ? "enabled" : "disabled"}.</p>
      </div>
      {/** ---------------------- Different charts ------------------------- */}
      {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div> */}

      {/** ---------------------- Different stats content 2 ------------------------- */}
      {/*         
            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div> */}

      {/** ---------------------- User source channels table  ------------------------- */}

      {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div> */}
    </>
  );
}

export default Dashboard;
