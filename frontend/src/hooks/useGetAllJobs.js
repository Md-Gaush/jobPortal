import { setAllJobs } from "@/redux/jobSlice"
import { JOBS_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"


const useGetAllJobs = () => {
     const dispatch = useDispatch()
     const { searchedQuery } = useSelector((store) => store.jobs);
    useEffect(()=>{
       const fetchAllJobs = async() =>{
        try {
             const res = await axios.get(`${JOBS_API_END_POINT}/get?keyword=${searchedQuery}`,{
                withCredentials:true
             });
               dispatch(setAllJobs(res?.data?.job))
            //  toast.success(res?.data?.message || "Get Jobs Successfully.")
        } catch (error) {
            toast.error(error.response.data.message || "Error")
            console.log(error)
        }
       }
       fetchAllJobs()
    },[])

}

export default useGetAllJobs