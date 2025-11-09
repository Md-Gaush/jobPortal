import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import CompanesTable from "./CompanesTable";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "@/redux/companySlice";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompany();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompany(input));
  }, [input]);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        {/* Filter and Create Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 my-5">
          <Input
            type="text"
            className="w-full sm:w-[300px]"
            placeholder="Filter By Name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="w-full sm:w-auto"
          >
            New Company
          </Button>
        </div>

        {/* Companies Table / Cards */}
        <CompanesTable />
      </div>
    </>
  );
};

export default Companies;
