import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Fixed day calc
  };

  return (
    <div className="p-4 sm:p-5 rounded-md shadow-md bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-xs sm:text-sm text-gray-600">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          className="rounded-full self-start sm:self-auto"
          size="icon"
          variant="outline"
        >
          <Bookmark className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 my-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border border-gray-100">
            <AvatarImage src={job?.companyId?.file} alt="company logo" />
          </Avatar>
          <div>
            <h1 className="font-semibold text-base sm:text-lg">
              {job?.companyId?.name}
            </h1>
            <p className="text-sm text-gray-500">{job?.location}</p>
          </div>
        </div>
      </div>

      {/* Job Info */}
      <div>
        <h1 className="font-bold text-lg sm:text-xl my-2">{job?.title}</h1>
        <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-bold text-xs sm:text-sm">
          {job?.position} Positions
        </Badge>
        <Badge variant="ghost" className="text-[#F83002] font-bold text-xs sm:text-sm">
          {job?.jobType}
        </Badge>
        <Badge variant="ghost" className="text-[#7209b7] font-bold text-xs sm:text-sm">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="outline"
          className="cursor-pointer w-full sm:w-auto"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white w-full sm:w-auto cursor-pointer hover:bg-[#5e0ca5]">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
