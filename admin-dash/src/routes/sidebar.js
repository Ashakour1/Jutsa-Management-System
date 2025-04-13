/** Icons are imported separatly to reduce build time */
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { LuBookMarked } from "react-icons/lu";
import {
  MdOutlineSportsSoccer,
  MdSupportAgent
} from "react-icons/md";
import { RiPresentationFill } from "react-icons/ri";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/app/finance", // url
    icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
    name: "Finance", // name that appear in Sidebar
  },
  {
    path: "/app/it-day", //url
    icon: <LuBookMarked className={submenuIconClasses} />, // icon component
    name: "Faculty Day", // name that appear in Sidebar
  },
  {
    path: "/app/sports",
    icon: <MdOutlineSportsSoccer className={submenuIconClasses} />,
    name: "Sports",
  },
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: "Activities", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/activity",
        icon: <RiPresentationFill className={submenuIconClasses} />,
        name: "Seminars & Workshops",
      },

      {
        path: "/app/caawiye", //url
        icon: <MdSupportAgent className={submenuIconClasses} />, // icon component
        name: "Caawiye", // name that appear in Sidebar
      },

      {
        path: "/app/blank",
        icon: <DocumentIcon className={submenuIconClasses} />,
        name: "Blank Page",
      },
      {
        path: "/app/404",
        icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
        name: "404",
      },
    ],
  },
  {
    path: "", //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
    name: "Settings", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/settings-profile", //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: "Profile", // name that appear in Sidebar
      },
      // {
      //   path: "/app/settings-billing",
      //   icon: <WalletIcon className={submenuIconClasses} />,
      //   name: "Billing",
      // },
      {
        path: "/app/Members", // url
        icon: <UsersIcon className={submenuIconClasses} />, // icon component
        name: "Team Members", // name that appear in Sidebar
      },
      {
        path: "/app/positions/",
        icon: <DocumentTextIcon className={submenuIconClasses} />,
        name: "Positions",
      },
    ],
  },
];

export default routes;
