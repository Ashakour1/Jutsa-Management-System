import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TitleCard from "../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import useSportsStore from "../../stores/sportsStore";
import { useEffect } from "react";

const TopSideButtons = () => {
  const Navigate = useNavigate();
  console.log("Navigate", Navigate);
  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => Navigate("/add-finance")}
      >
        Add New
      </button>
    </div>
  );
};

function Sports() {
  const { SportsDetails, loading, error, fetchSportsDetails } =
  useSportsStore();

  console.log(SportsDetails)
  useEffect(() => {
    fetchSportsDetails();
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
        title="Sports"
        // description="Financial"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>monitorName</th>
                <th>monitorNumber</th>
                <th>className</th>
                <th>description</th>
                <th>amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {SportsDetails.map((k, index) => (
                <tr>
                  <td>{k.monitorName}</td>
                  <td>{k.monitorNumber}</td>

                  <td>
                    <div className="badge badge-primary">{k.className}</div>
                  </td>
                  <td>{k.description}</td>
                  <td>{k.amount}</td>

                  <td>
                    <button className="btn btn-square btn-ghost">
                      <TrashIcon className="w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Sports;
