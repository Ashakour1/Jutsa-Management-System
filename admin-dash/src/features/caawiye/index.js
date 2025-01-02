import React from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const TopSideButtons = () => (
  <div className="inline-block float-right">
    <Link to="/app/caawiye/add">
      <button className="btn px-6 btn-sm normal-case btn-primary">
        Add New
      </button>
    </Link>
  </div>
);

const Caawiye = () => {
  return (
    <TitleCard
      title="Competitors"
      topMargin="mt-2"
      TopSideButtons={<TopSideButtons />}
    >
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Number</th>
              <th>Semester</th>
              <th>Class Name</th>
              <th>Project Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>12345</td>
              <td>5th</td>
              <td>Computer Science</td>
              <td>Project Alpha</td>
              <td>Active</td>
              <td>
                <div className="flex space-x-2">
                  <button className="btn btn-square btn-ghost">
                    <PencilIcon className="w-5" />
                  </button>
                  <button className="btn btn-square btn-ghost">
                    <TrashIcon className="w-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
};

export default Caawiye;
