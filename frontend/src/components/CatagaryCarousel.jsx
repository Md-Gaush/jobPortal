import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CatagaryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 my-10">
      <h2 className="text-center text-xl md:text-2xl font-bold text-gray-800 mb-6">
        Explore By Category
      </h2>

      <div className="relative max-w-4xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent className="flex gap-4 sm:gap-6">
            {category.map((cat, i) => (
              <CarouselItem
                key={i}
                // ✅ exactly 3 items visible at a time
                className="basis-full sm:basis-1/2 md:basis-1/3 flex justify-center"
              >
                <Button
                  variant="outline"
                  onClick={() => searchJobHandler(cat)}
                  className="rounded-full w-full sm:w-auto text-sm md:text-base px-6 py-3 font-medium hover:bg-[#6A38C2] hover:text-white transition-all duration-300"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-gray-100 rounded-full z-10" />
          <CarouselNext className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-gray-100 rounded-full z-10" />
        </Carousel>
      </div>
    </div>
  );
};

export default CatagaryCarousel;
