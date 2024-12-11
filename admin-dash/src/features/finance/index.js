import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import useFinanceStore from "../../stores/financeStore";

const TopSideButtons = () => {
  const Navigate = useNavigate();
  // console.log("Navigate", Navigate);
  return (
    <div className="inline-block float-right">
      <Link to={"/app/finance/add"} >
    <button
      className="btn px-6 btn-sm normal-case btn-primary"
      
    >
      Add New
    </button>
    </Link>
  </div>
  );
};

function Leads() {
  const { financeDetails, loading, error, fetchFinanceDetails , deleteFinanceDetails } =
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
                <th>ID</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th>Transactions Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {financeDetails.map((k, index) => (
                <tr key={k.id}>
 
                  <td>{k.id}</td>
                  <td>{k.title}</td>
                  <td>{k.amount}</td>

                  <td>
                    <div className="badge badge-primary">{k.type}</div>
                  </td>
                  <td>{k.category}</td>
                  <td>{k.createdAt.slice(0,10)}</td>
                  <td>
                    <button className="btn btn-square btn-ghost">
                      <TrashIcon className="w-5" onClick={() => deleteFinanceDetails(k.id)}/>
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
