import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { JOBS_API_END_POINT } from "@/utils/constant";
import { ArrowLeft, Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: [],
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    companyId: "",
  });
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, companyId: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOBS_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.success(res?.data?.message);
      navigate("/admin/jobs");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto my-6">
        <form
          onSubmit={submitHandler}
          className="border border-gray-200 shadow-xl rounded-md p-6 sm:p-8 flex flex-col gap-4"
        >
          <Button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="flex items-center gap-2 text-gray-500 font-semibold w-fit"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>

          <h1 className="font-bold text-xl sm:text-2xl text-center sm:text-left">
            Post New Job
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Enter role"
                className="my-2 w-full"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter Description"
                className="my-2 w-full"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                placeholder="Enter requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="my-2 w-full"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                placeholder="Salary in LPA"
                value={input.salary}
                onChange={changeEventHandler}
                className="my-2 w-full"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="Enter Location"
                value={input.location}
                onChange={changeEventHandler}
                className="my-2 w-full"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Full Time / Part Time"
                className="my-2 w-full"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="number"
                name="experienceLevel"
                placeholder="Years"
                value={input.experienceLevel}
                onChange={changeEventHandler}
                className="my-2 w-full"
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="position"
                placeholder="Number Of Candidates"
                value={input.position}
                onChange={changeEventHandler}
                className="my-2 w-full"
              />
            </div>
          </div>

          {companies.length > 0 && (
            <Select className="mb-4 w-full" onValueChange={selectChangeHandler}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company._id} value={company._id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {loading ? (
            <Button className="w-full my-4 flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-2">
              Post New Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-sm text-red-600 font-bold text-center mt-2">
              *Please register a company first before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
