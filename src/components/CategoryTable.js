import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../fbManager"; // Ensure this path is correct for your Firebase manager import.
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function CategoryTable({ categoryData, selectedYear, selectedCategory }) {
  const { userId } = useAuth(); // Assuming useAuth is correctly imported from Clerk.

  return (
    <Table id="left_list">
      <Toaster />
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categoryData && categoryData.length > 0 ? (
          categoryData.map((category) => (
            <TableRow key={category.id} className="p-0">
              <TableCell className="font-medium text-sm">
                <Link href={category.link} target="_blank">
                  {category.title}
                </Link>
              </TableCell>
              <TableCell className="font-medium text-sm">
                {category.date}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant={"outline"}
                  className="hover:bg-red-500 w-fit h-fit"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (!userId) return;
                    const toastId = toast.loading("Deleting...");
                    try {
                      await deleteDoc(
                        doc(
                          db,
                          "years",
                          `${selectedYear}`,
                          selectedCategory,
                          category.id
                        )
                      );
                      toast.success("File Deleted Successfully", {
                        id: toastId,
                      });
                    } catch (error) {
                      toast.error(`Error Deleting File : ${error}`, {
                        id: toastId,
                      });
                    }
                  }}
                >
                  <Trash2Icon size={10} />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <div className="p-2 text-slate-400">No categories data.</div>
        )}
      </TableBody>
    </Table>
  );
}

export default CategoryTable;
