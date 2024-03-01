"use client";

import { useEffect, useState } from "react";
import { CategoryPicker } from "@/components/CategoryPicker";
import InputCard from "@/components/InputCard";
import YearPicker from "@/components/YearPicker";
import { useAuth } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../fbManager";

import CategoryTable from "@/components/CategoryTable";
import { Skeleton } from "@/components/ui/skeleton";

function Page() {
  const router = useRouter(); // Correctly use the useRouter hook.
  const { userId } = useAuth(); // Correctly use the useAuth hook (assuming it's from Clerk).
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState("movie");

  const [categoryData, setCategoryData] = useState([]);
  const [loadingData, setLoadingData] = useState(true); // Add a loading state

  const [docs, loading, error] = useCollection(
    query(
      collection(db, "years", `${selectedYear}`, selectedCategory),
      orderBy("timestamp", "asc")
    )
  );

  useEffect(() => {
    if (!selectedYear || !selectedCategory) return;
    if (loading) {
      // When the data is still loading, don't do anything else
      return;
    }

    if (error) {
      // Handle error state
      console.error(error);
      setLoadingData(false); // Set loading state to false as data loading is done
      return;
    }

    const dataOfCategory = docs?.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      date: doc.data().date,
      link: doc.data().link,
    }));

    setCategoryData(dataOfCategory);

    setLoadingData(false); // Set loading state to false as data loading is done
  }, [selectedYear, selectedCategory, docs, loading, error]);

  // Redirect logic based on the user state.
  if (!userId || userId !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
    router.push("/");
  }

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col h-auto w-full p-4 overflow-x-hidden">
      <header className="w-full flex items-center justify-center ">
        <YearPicker onYearChange={handleYearChange} />
        <CategoryPicker onCategoryChange={handleCategoryChange} />
      </header>

      <div className="flex w-full h-full items-center justify-between ">
        {loadingData ? (
          <div className="flex flex-col space-y-3 items-center justify-center">
            <Skeleton className="h-[45px] w-[500px] rounded-xl" />
          </div>
        ) : (
          <CategoryTable categoryData={categoryData} loading={loadingData} />
        )}
        <div
          id="right_form"
          className="w-1/2 h-full flex justify-center items-center"
        >
          <InputCard
            yearValue={selectedYear}
            categoryValue={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
