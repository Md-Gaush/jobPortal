
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 sm:px-6 md:px-8">
      <div className="flex flex-col gap-5 my-10">
        <span className="px-4 py-2 rounded-full mx-auto bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          No. 1 Job Hunt Website
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
          Search, Apply & <br className="hidden sm:block" />
          Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat exercitationem, quo soluta laudantium obcaecati facere!
        </p>

        <div className="flex flex-col sm:flex-row w-full sm:w-[70%] md:w-[50%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center mx-auto gap-2 sm:gap-4 p-2">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find Your Dream Jobs"
            className="outline-none border-none w-full text-sm sm:text-base px-2 py-1"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full sm:rounded-r-full bg-[#6A38C2] px-4 py-2 sm:py-0 w-full sm:w-auto flex justify-center"
          >
            <Search className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;




// import React, { useState } from 'react'
// import { Button } from './ui/button'
// import { Search } from 'lucide-react'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'
// import { useNavigate } from 'react-router-dom'

// const HeroSection = () => {

//     const dispatch = useDispatch()
//    const navigate = useNavigate()

//   const [query,setQuery] = useState("")

//   const searchJobHandler = () => {
//       dispatch(setSearchedQuery(query))
//       navigate('/browse');
//   }

//   return (
//     <div className='text-center'>
//         <div className='flex flex-col gap-5 my-10'>
//         <span className='px-4 py-2 rounded-full mx-auto bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
//     <h1 className='text-5xl font-bold'>Search, Apply & <br/>Get Your<span className='text-[#6A38C2]'>Dream Jobs</span></h1>
//     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat exercitationem, quo soluta laudantium obcaecati facere!</p>
//     <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center mx-auto gap-4 '>
//         <input
//         type='text'
//         onChange={(e)=>setQuery(e.target.value)}
//         placeholder='Find Your Dream Jobs' 
//         className='outline-none border-none w-full'
//         />
//         <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2] w-15'>
//             <Search className='size-5'/>
//         </Button>
//     </div>
//         </div>
//        </div> 
//   )
// }

// export default HeroSection