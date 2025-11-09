import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import useDeleteCompany from "@/hooks/useDeleteCompany";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  useDeleteCompany(params.id);

  const [isLoading, setIsLoading] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singalCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleInputFile = (e) => {
    setCompanyData({ ...companyData, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", companyData.name);
    formData.append("description", companyData.description);
    formData.append("website", companyData.website);
    formData.append("location", companyData.location);
    if (companyData.file) formData.append("file", companyData.file);

    try {
      setIsLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success(res?.data?.message);
      navigate("/admin/companies");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCompanyData({
      name: singalCompany?.name || "",
      description: singalCompany?.description || "",
      website: singalCompany?.website || "",
      location: singalCompany?.location || "",
      file: singalCompany?.file || null,
    });
  }, [singalCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Button
              type="button"
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 text-gray-500 font-semibold w-fit"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl sm:text-2xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                value={companyData.name}
                name="name"
                onChange={handleInput}
                type="text"
                placeholder="JobHunt"
                className="my-2 w-full"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={companyData.description}
                name="description"
                onChange={handleInput}
                type="text"
                placeholder="Describe your company"
                className="my-2 w-full"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={companyData.website}
                name="website"
                onChange={handleInput}
                type="text"
                placeholder="http://example.com"
                className="my-2 w-full"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={companyData.location}
                name="location"
                onChange={handleInput}
                type="text"
                placeholder="India"
                className="my-2 w-full"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Logo</Label>
              <Input
                accept="image/*"
                type="file"
                className="my-2 w-full"
                onChange={handleInputFile}
              />
            </div>
          </div>

          <Button type="submit" className="w-full my-2" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Please Wait..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
