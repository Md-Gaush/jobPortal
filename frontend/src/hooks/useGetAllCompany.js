import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
       
        dispatch(setCompanies(res?.data?.companies));
       
      } catch (error) {
        toast.error(error.response.data.message || "error ");
        console.log(error);
      }
    };
    fetchAllCompanies ();
  }, []);
};

export default useGetAllCompany;
