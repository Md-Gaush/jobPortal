import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async (e) => {
    e.preventDefault();
    if (!companyName) {
      toast.error("Please enter a company name");
      return;
    }
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(res?.data?.message);
      const companyId = res?.data?.company?._id;
      navigate(`/admin/companies/${companyId}`);
      dispatch(setSingleCompany(res?.data?.company));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="mb-8">
          <h1 className="font-bold text-2xl sm:text-3xl">Your Company Name</h1>
          <p className="text-gray-500 mt-2 sm:text-lg">
            Enter your company name to get started.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <Label className="sm:w-1/4">Company Name</Label>
            <Input
              name="name"
              onChange={(e) => setCompanyName(e.target.value)}
              type="text"
              className="w-full sm:w-3/4"
              placeholder="JobHunt"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-6">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="w-full sm:w-auto"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyCreate;
