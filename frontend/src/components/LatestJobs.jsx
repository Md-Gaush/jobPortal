import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'



const LatestJobs = () => {
   
  const { allJobs } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.auth); 
  const navigate = useNavigate();

  const handleCardClick = (jobId) => {
    if (user) {
      navigate(`/description/${jobId}`);
    } else {
      toast.info("Please sign up or log in to view job details.");
      navigate("/signup");
    }
  };

  return (
    <div className='max-w-7xl mx-auto py-10'>
    <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span>Jobs Opening</h1>
     <div className='grid grid-cols-3 gap-4 w-full items-center justify-center'>
     
     {allJobs && allJobs.length > 0 ? (
          allJobs.slice(0, 6).map((job) => (
            <div
              key={job._id}
              onClick={() => handleCardClick(job._id)}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <LatestJobCard job={job} />
            </div>
          ))
        ) : (
          <h1>No Jobs Available</h1>
        )}


{/* {
  allJobs && allJobs.length > 0 ? (
    allJobs.slice(0, 6).map((job) => (
      <Link key={job._id} to={`/description/${job._id}`} className="block">
        <LatestJobCard job={job} />
      </Link>
    ))
  ) : (
    <h1>No Jobs Available</h1>
  )
} */}
     </div>
      </div>
  )
}

export default LatestJobs
  