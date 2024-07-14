"use client";
import YearPicker from "@/components/YearPicker";
import { collection, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../fbManager";
import { useCollection } from "react-firebase-hooks/firestore";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ChevronsRight } from "lucide-react";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear() - 1
  );
  const [selectedCategory, setSelectedCategory] = useState("movie");
  const [categoryData, setCategoryData] = useState([]);

  const [api, setApi] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categories = ["movie", "music", "product", "book"];

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
      return;
    }

    const dataOfCategory = docs?.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      date: doc.data().date,
      link: doc.data().link,
    }));

    setCategoryData(dataOfCategory);
  }, [selectedYear, selectedCategory, docs, loading, error]);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap();
      setSelectedCategory(categories[newIndex % categories.length]);
    });
  }, [api, categories]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <main className="w-full h-full flex flex-col items-center p-0 lg:p-4 overflow-hidden">
      <header className="w-full flex justify-start">
        <YearPicker onYearChange={handleYearChange} />
        <span className="flex items-center text-slate-500 ml-8 font-semibold lg:hidden">
          Slide <ChevronsRight />
        </span>
      </header>
      <Carousel
        className="w-full max-w-[45rem]"
        opts={{
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardHeader className="flex flex-col items-center justify-center">
                    <CardTitle className="text-[1.1rem] lg:text-3xl">
                      Justin&#39;s Favorite{" "}
                      {selectedCategory.charAt(0).toUpperCase() +
                        selectedCategory.slice(1)}
                      s in {selectedYear}
                    </CardTitle>

                    <CardDescription>
                      Click for more information
                    </CardDescription>
                  </CardHeader>
                  <Separator className="mb-2" />
                  <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-4">
                    {categoryData && categoryData.length > 0 ? (
                      categoryData.map((category) => (
                        <CardContent
                          key={category}
                          className="flex flex-col items-center lg:m-2 hover:rounded-lg hover:cursor-pointer hover:text-blue-600"
                        >
                          <Link href={category.link} target="_blank">
                            <h1 className="truncate text-sm lg:text-lg font-semibold">
                              {category.title}
                            </h1>
                          </Link>
                          <p className="text-xs lg:text-sm font-normal text-gray-500">
                            {category.date}
                          </p>
                        </CardContent>
                      ))
                    ) : (
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-xl font-semibold text-slate-500">
                          {selectedYear} Not Posted
                        </span>
                      </CardContent>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
