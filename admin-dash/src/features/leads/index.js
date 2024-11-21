import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TitleCard from "../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import useFinanceStore from "../../stores/financeStore";
import { useEffect } from "react";

const TopSideButtons = () => {
  const Navigate = useNavigate();
  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => Navigate("/register")}
      >
        Add New
      </button>
    </div>
  );
};

function Leads() {
  const { financeDetails, loading, error, fetchFinanceDetails } =
    useFinanceStore();
  console.log(financeDetails.data);

  useEffect(() => {
    fetchFinanceDetails();
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
        title="Finance"
        // description="Financial"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {financeDetails.map((k, index) => (
                <tr>
                  <td>{k.title}</td>
                  <td>{k.amount}</td>

                  <td>
                    <div className="badge badge-primary">{k.type}</div>
                  </td>
                  <td>{k.category}</td>
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

export default Leads;
