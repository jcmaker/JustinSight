import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "../../fbManager";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
function InputCard({ yearValue, categoryValue }) {
  // State management for input fields
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");

  // Firestore upload handler
  const uploadToFirestore = async () => {
    if (!title || !date || !link) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      const docRef = await addDoc(
        collection(db, `years/${yearValue}/${categoryValue}`),
        {
          title,
          date,
          link,
          timestamp: serverTimestamp(),
        }
      );
      toast.success("Upload successful!");

      // 입력 필드 초기화
      setTitle("");
      setDate("");
      setLink("");
    } catch (e) {
      toast.error("Error uploading data", e);
    }
  };

  return (
    <Card className="w-[350px]">
      <Toaster />
      <CardHeader>
        <CardTitle>Upload List</CardTitle>
        <CardDescription>
          Upload your favorite {categoryValue ? categoryValue : "Things"} in
          one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form submission
            uploadToFirestore();
          }}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={yearValue}
                placeholder={`${yearValue}`}
                disabled
              />
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={categoryValue}
                placeholder={`${categoryValue}`}
                disabled
              />
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Label htmlFor="date">
                {categoryValue === "music" ? "Artist" : "Date"}{" "}
              </Label>
              <Input
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" onClick={uploadToFirestore} className="font-bold">
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
}
export default InputCard;
