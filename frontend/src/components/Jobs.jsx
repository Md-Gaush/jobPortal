import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const { user } = useSelector((store) => store.auth);
  const { allJobs, searchedQuery } = useSelector((store) => store.jobs);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchedQuery && Object.keys(searchedQuery).length > 0) {
      const filtered = allJobs.filter((job) => {
        const matchLocation =
          !searchedQuery.Location ||
          job.location?.toLowerCase() === searchedQuery.Location.toLowerCase();

        const matchIndustry =
          !searchedQuery.Industry ||
          job.title
            ?.toLowerCase()
            .includes(searchedQuery.Industry.toLowerCase());

        const matchSalary =
          !searchedQuery.Salary ||
          job.salaryRange?.toLowerCase() === searchedQuery.Salary.toLowerCase();

        return matchLocation && matchIndustry && matchSalary;
      });
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  const handleCardClick = (jobId) => {
    if (user) {
      navigate(`/description/${jobId}`);
    } else {
      toast.info("Please sign up or log in to view job details.");
      navigate("/signup");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Filter section */}
          <div className="lg:w-1/4 w-full">
            <FilterCard />
          </div>

          {/* Jobs grid */}
          <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
            {filteredJobs.length <= 0 ? (
              <div className="text-center text-gray-500 mt-10">No Jobs Found</div>
            ) : (
              <div
                className="
                  grid 
                  grid-cols-1 
                  sm:grid-cols-2 
                  lg:grid-cols-3 
                  gap-5
                "
              >
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    onClick={() => handleCardClick(job._id)}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
