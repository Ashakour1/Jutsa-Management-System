import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TitleCard from "../../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import useMemberStore from "../../../stores/memberStore";
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

function Members() {
  const { MemberDetails, loading, error, fetchMemberDetails } =
  useMemberStore();
  console.log(MemberDetails.data);

  useEffect(() => {
    fetchMemberDetails();
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
        title="Team Members"
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
                <th>Address</th>
                <th>Email</th>
                <th>position_Id</th>
                <th>Semester</th>
                <th>year</th>
                <th>Actions</th>

               
              </tr>
            </thead>
            <tbody>
              {MemberDetails.map((k, index) => (
                <tr>
                  <td>{k.studentId}</td>
                  <td>{k.name}</td>
                  <td>{k.email}</td>
                  <td>{k.position_Id}</td>
                  <td>{k.semester}</td>
                  <td>{k.year}</td>
                 
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

export default Members;
