import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getFinances, deleteFinance } from "@/api/finance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // Import the spinner
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BiEdit, BiTrash } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Finance = () => {
  const [finances, setFinances] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFinances() {
      try {
        const response = await getFinances();
        if (response.success) {
          setFinances(response.data);
        } else {
          toast.error("Error fetching finances");
          console.error("Error fetching finances:", response.error);
        }
      } catch (error) {
        toast.error("Error fetching finances");
        console.error("Error fetching finances:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    }

    fetchFinances();
  }, []);

  const handleEdit = (finance) => {
    navigate(`/dashboard/finance/manage/${finance.id}`, {
      state: { finance }, // Pass finance data as state
    });
  };

  const handleDelete = async (finance) => {
    try {
      const response = await deleteFinance(finance.id);
      if (response.success) {
        setFinances(finances.filter((f) => f.id !== finance.id));
      } else {
        console.error("Error deleting finance:", response.error);
      }
    } catch (error) {
      console.error("Error deleting finance:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col h-full p-6">
      <div className="flex-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Finance</CardTitle>
            <Link to="/dashboard/finance/manage">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <FaPlus className="w-4 h-4" />
                <span>Add New</span>
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
<<<<<<< HEAD
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Reg Date</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finances.map((finance) => (
                  <TableRow key={finance.id}>
                    <TableCell>{finance.title}</TableCell>
                    <TableCell>{finance.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      {finance.type === "income" ? (
                        <span className="text-green-500">Income</span>
                      ) : (
                        <span className="text-red-500">Expense</span>
                      )}
                    </TableCell>
                    <TableCell>{finance.category}</TableCell>
                    <TableCell>
                      {new Date(finance.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <AiOutlineMenu className="w-4 h-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <BiEdit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BiTrash className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
=======
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <ClipLoader size={40} color={"#4A5568"} loading={loading} />
              </div>
            ) : finances.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
>>>>>>> ccec6920188afc6060bb699c9c2cbba90af0e140
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {finances.map((finance) => (
                    <TableRow key={finance.id}>
                      <TableCell>{finance.updatedAt.slice(0, 10)}</TableCell>
                      <TableCell>{finance.title}</TableCell>
                      <TableCell>${finance.amount.toLocaleString()}</TableCell>
                      <TableCell>{finance.type}</TableCell>
                      <TableCell>{finance.category}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <AiOutlineMenu className="w-4 h-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(finance)}
                            >
                              <BiEdit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(finance)}
                            >
                              <BiTrash className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <Link to="/dashboard/finance/manage">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <FaPlus className="w-4 h-4" />
                    <span>Add New</span>
                  </Button>
                </Link>
                <p className="mt-4 text-gray-500">No finance data available.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Finance;
