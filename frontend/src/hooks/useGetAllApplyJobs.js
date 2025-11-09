import { setAllApplyiedJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";




const useGetAllApplyJob = () =>{

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchGetApplyJob = async () =>{
            try {
                 const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{
                    withCredentials:true
                 })
                dispatch(setAllApplyiedJob(res?.data?.applicant))
                 toast.success(res?.data?.message )
            } catch (error) {
                console.error(error.response.data.message)
                console.log(error)
            }
        }
        fetchGetApplyJob()
    },[])
}

export default useGetAllApplyJob;