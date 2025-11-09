import { setAllAdminJobs, setAllJobs } from "@/redux/jobSlice"
import { JOBS_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"


const useGetAllAdminJobs = () => {
     const dispatch = useDispatch()

    useEffect(()=>{
       const fetchAllJobs = async() =>{
        try {
             const res = await axios.get(`${JOBS_API_END_POINT}/getadminjobs`,{
                withCredentials:true
             });
             
              dispatch(setAllAdminJobs(res?.data?.jobs))
            //  toast.success(res?.data?.message || "Get Jobs Successfully.")
        } catch (error) {
            toast.error(error.response.data.message || "error ")
            console.log(error)
        }
       }
       fetchAllJobs()
    },[])

}

export default useGetAllAdminJobs