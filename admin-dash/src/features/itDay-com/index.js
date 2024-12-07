import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TitleCard from "../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import useCompetitorStore from "../../stores/competitorStore";
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

function ItDayCompetitors() {
  const { CompetitorDetails, loading, error, fetchCompetitorDetails } =
  useCompetitorStore();

  // console.log(SportsDetails)
  useEffect(() => {
    fetchCompetitorDetails();
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
        title="Competitors"
        // description="Financial"
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
                <th>className</th>
                <th>projectName</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {CompetitorDetails.map((k, index) => (
                <tr>
                  <td>{k.idNumber}</td>
                  <td>{k.name}</td>
                  
                  <td>{k.number}</td>
                  <td>{k.semester}</td>
                  <td>{k.className}</td>
                  <td>{k.projectName}</td>
                  <td><div className="badge badge-success">{k.status}</div></td>

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

export default ItDayCompetitors;
