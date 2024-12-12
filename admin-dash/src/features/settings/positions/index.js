import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TitleCard from "../../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import usePositionStore from "../../../stores/positionStore";
import { useEffect } from "react";

const TopSideButtons = () => {
  const Navigate = useNavigate();
  console.log("Navigate", Navigate);
  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => Navigate("/app/positions/add")}
      >
        Add New
      </button>
    </div>
  );
};

function Positions() {
  const { PositionsDetails, loading, error, fetchPositionDetails } =
    usePositionStore();
  useEffect(() => {
    fetchPositionDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <TitleCard
        title="Positions"
        // description="Financial"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {PositionsDetails.map((k, index) => (
              <tr>
                <td>{k.title}</td>
                <td>{k.description}</td>

                <td>{k.createdAt.slice(0, 10)}</td>

                <td>
                  <button className="btn btn-square btn-ghost">
                    <TrashIcon className="w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TitleCard>
    </>
  );
}

export default Positions;
