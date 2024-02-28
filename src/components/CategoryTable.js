import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { deleteDoc } from "firebase/firestore";
import { db } from "../../fbManager";

function CategoryTable({ categoryData, loading }) {
  const { userId } = useAuth(); // Correctly use the useAuth hook (assuming it's from Clerk).

  async function deleteList(categoryId) {
    if (!userId || !categoryId) return;

    const toastId = toast.loading("Deleting...");

    try {
      async () => {
        deleteDoc(doc(db, `years/${selectedYear}/${selectedCategory}`)).then(
          () => {
            toast.success("File Deleted Successfully", {
              id: toastId,
            });
          }
        );
      };
    } catch (error) {
      toast.error(`Error Deleting File : ${error}`, {
        id: toastId,
      });
    }
  }

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
                  onClick={deleteList}
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
