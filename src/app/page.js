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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState("movie");
  const [categoryData, setCategoryData] = useState([]);
  const [loadingData, setLoadingData] = useState(true); // Add a loading state

  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const categories = ["movie", "music", "product"];

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

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex + 1);
      setSelectedCategory(categories[newIndex % categories.length]);
    });
  }, [api, categories]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCarouselChange = (newIndex) => {
    let newCategory = "movie";
    switch (newIndex) {
      case 0:
        newCategory = "movie";
        break;
      case 1:
        newCategory = "music";
        break;
      case 2:
        newCategory = "product";
        break;
      default:
        return; // 알려지지 않은 인덱스에 대해서는 아무 작업도 하지 않음
    }

    handleCategoryChange(newCategory); // 카테고리 변경 함수를 호출합니다.
    console.log(newCategory);
  };

  return (
    <main className="w-full h-full flex flex-col items-center p-0 lg:p-4">
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
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardHeader className="flex flex-col items-center justify-center">
                    <CardTitle className="text-[1.1rem] lg:text-3xl">
                      Justin&#39;s Favorite {selectedCategory} in {selectedYear}
                    </CardTitle>
                    <CardDescription>Click for information</CardDescription>
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
                            <h1 className="text-sm lg:text-lg font-semibold">
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
                          2024 Not Ready
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
