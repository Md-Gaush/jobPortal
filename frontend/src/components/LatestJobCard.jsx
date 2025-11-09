import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";

const LatestJobCard = ({ job }) => {
  return (
    <div className="p-5 mt-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow duration-300">
      {/* Top: Company Logo & Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={job?.companyId?.file} />
        </Avatar>
        <div>
          <h1 className="font-medium text-lg sm:text-xl">{job?.companyId?.name}</h1>
          <p className="text-sm sm:text-base text-gray-500">{job?.location}</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mt-4">
        <h1 className="font-bold text-lg sm:text-xl">{job.title}</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-bold">
          {job?.position} <span>Positions</span>
        </Badge>
        <Badge variant="ghost" className="text-[#F83002] font-bold">
          {job?.jobType}
        </Badge>
        <Badge variant="ghost" className="text-[#7209b7] font-bold">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
