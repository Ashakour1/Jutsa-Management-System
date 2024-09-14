import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getSports, deleteSport } from "@/api/sport";
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

export default function Sports() {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSportData() {
      try {
        const response = await getSports();
        if (response.success) {
          setSports(response.data);
        } else {
          toast.error("Error fetching sports");
          console.error("Error fetching sports:", response.error);
        }
      } catch (error) {
        toast.error("Error fetching sports");
        console.error("Error fetching sports:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    }
    fetchSportData();
  }, []);

  const handleEdit = (sport) => {
    navigate(`/dashboard/sports/manage/${sport.id}`, {
      state: { sport },
    });
  };

  const handleDelete = async (sport) => {
    try {
      const response = await deleteSport(sport.id);
      if (response.success) {
        setSports(sports.filter((s) => s.id !== sport.id));
        toast.success("Sport deleted successfully");
      } else {
        toast.error("Error deleting sport");
        console.error("Error deleting sport:", response.error);
      }
    } catch (error) {
      toast.error("Error deleting sport");
      console.error("Error deleting sport:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col h-full p-6">
      <div className="flex-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sports</CardTitle>
            <Link to="/dashboard/sports/manage">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <FaPlus className="w-4 h-4" />
                <span>Add New</span>
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <ClipLoader size={40} color={"#4A5568"} loading={loading} />
              </div>
            ) : sports.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Monitor Name</TableHead>
                    <TableHead>Monitor Number</TableHead>
                    <TableHead>Class Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sports.map((sport) => (
                    <TableRow key={sport.id}>
                      <TableCell>{sport.updatedAt.slice(0, 10)}</TableCell>
                      <TableCell>{sport.monitorName}</TableCell>
                      <TableCell>{sport.monitorNumber}</TableCell>
                      <TableCell>{sport.className}</TableCell>
                      <TableCell>{sport.description}</TableCell>
                      <TableCell>${sport.amount.toLocaleString()}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleEdit(sport)}>
                              <BiEdit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(sport)}
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
                <Link to="/dashboard/sports/manage">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <FaPlus className="w-4 h-4" />
                    <span>Add New</span>
                  </Button>
                </Link>
                <p className="mt-4 text-gray-500">No sports data available.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
