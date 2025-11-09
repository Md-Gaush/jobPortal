import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi Ncr", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend", "Backend", "Full Stack"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "40k-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isOpen, setIsOpen] = useState(false); // for mobile toggle
  const dispatch = useDispatch();

  const handleChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilters));
  }, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white rounded-md shadow-sm border border-gray-200">
      {/* Mobile Header with Toggle Button */}
      <div className="flex items-center justify-between p-3 lg:p-4 border-b border-gray-100">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter className="size-5" />
        </Button>
      </div>

      {/* Filter Options */}
      <div
        className={`
          ${isOpen ? "block" : "hidden"} 
          lg:block 
          p-3 
          lg:p-4 
          max-h-[70vh] 
          overflow-y-auto 
          transition-all duration-300
        `}
      >
        {filterData.map((data, i) => (
          <div key={i} className="mt-4">
            <h1 className="font-semibold text-base lg:text-lg text-gray-800">
              {data.filterType}
            </h1>
            <RadioGroup
              value={selectedFilters[data.filterType] || ""}
              onValueChange={(value) => handleChange(data.filterType, value)}
              className="mt-2 space-y-2"
            >
              {data.array.map((item, j) => (
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  key={j}
                >
                  <RadioGroupItem value={item} />
                  <Label className="text-sm lg:text-base">{item}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
