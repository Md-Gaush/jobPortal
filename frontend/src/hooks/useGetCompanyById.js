import { setCompanies, setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchByIdCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true,
        });
       console.log("getbyidcomapny",res?.data?.company)
        dispatch(setSingleCompany(res?.data?.company));
       
      } catch (error) {
        toast.error(error.response.data.message || "error ho gaya hai");
        console.log(error);
      }
    };
    if (companyId) {  // ✅ ensure it runs only when companyId is available
        fetchByIdCompanies();
      }
  }, [companyId,dispatch]);
};

export default useGetCompanyById;
