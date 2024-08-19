import { useEffect, useState } from "react";
import { getFinances } from "@/api/finance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FinanceForm from "@/components/FinanceForm";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BiEdit, BiTrash } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";

const Finance = () => {
  const [finances, setFinances] = useState([]);

  useEffect(() => {
    async function fetchFinances() {
      try {
        const response = await getFinances();
        if (response.success) {
          setFinances(response.data);
        } else {
          console.error("Error fetching finances:", response.error);
        }
      } catch (error) {
        console.error("Error fetching finances:", error);
      }
    }

    fetchFinances();
  }, [finances]);

  return (
    <div className="container mx-auto flex flex-col h-full p-6">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Finance</h1>
      </header>
      <div className="flex-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Finance</CardTitle>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <FaPlus className="w-4 h-4" />
              <span>Add New</span>
            </Button>
          </CardHeader>
          <CardContent>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {finances.map((finance) => (
                  <TableRow key={finance.id}>
                    <TableCell>
                      {new Date(finance.createdAt).toLocaleDateString()}
                    </TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <FinanceForm />
      </div>
    </div>
  );
};

export default Finance;
