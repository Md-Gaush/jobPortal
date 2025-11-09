
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useDeleteCompany = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchByIdCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/delete//${companyId}`, {
          withCredentials: true,
        });
      toast.success(res?.data?.message || "Company Deleted")
       
      } catch (error) {
        toast.error(error.response.data.message || "error ");
        console.log(error);
      }
    };
    if (companyId) {  // ✅ ensure it runs only when companyId is available
        fetchByIdCompanies();
      }
  }, [companyId,dispatch]);
};

export default useDeleteCompany;
