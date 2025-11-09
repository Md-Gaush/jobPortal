


import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import {
  APPLICATION_API_END_POINT,
  JOBS_API_END_POINT,
} from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      toast.success(res?.data?.message);

      const updatedSingleJob = {
        ...singleJob,
        applications: [...singleJob.applications, { applicant: user?._id }],
      };
      dispatch(setSingleJob(updatedSingleJob));
      setIsApplied(true);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        dispatch(setSingleJob(res?.data?.job));

        const applied = res?.data?.job?.applications?.some(
          (applicantId) => String(applicantId.applicant) === String(user?._id)
        );
        setIsApplied(applied);
      } catch (error) {
        toast.error(error.response.data.message || "Error fetching job details");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 md:px-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="w-full md:w-auto">
          <h1 className="font-bold text-xl sm:text-2xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge variant="ghost" className="text-blue-700 font-bold">
              {singleJob?.position} Positions
            </Badge>
            <Badge variant="ghost" className="text-[#F83002] font-bold">
              {singleJob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-[#7209b7] font-bold">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg w-full md:w-auto ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-blue-500"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Divider */}
      <h1 className="border-b-2 border-gray-200 font-medium py-5 text-lg sm:text-xl mt-4">
        Job Description
      </h1>

      {/* Job Details */}
      <div className="py-3 text-sm sm:text-base md:text-lg">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.description}.
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.experienceLevel} Years
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Total Applications:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;





