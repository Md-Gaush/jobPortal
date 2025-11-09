import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";

const CompanesTable = () => {
  const { companies, searchCompany } = useSelector((store) => store.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies || []);

  useEffect(() => {
    const filteredCompany = (companies || []).filter((company) => {
      if (!searchCompany) return true;
      return company?.name?.toLowerCase().includes(searchCompany.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompany]);

  const deleteCompany = async (companyId) => {
    if (!companyId) return;
    try {
      const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
        withCredentials: true,
      });
      setFilterCompany((prev) => prev.filter((c) => c._id !== companyId));
      toast.success(res?.data?.message || "Company Deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  if (!filterCompany || filterCompany.length === 0) {
    return <p className="text-center my-4">You haven't registered any company yet.</p>;
  }

  return (
    <div className="w-full">
      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableCaption>A list of your recently registered companies</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterCompany.map((company) => (
              <TableRow key={company?._id}>
                <TableCell>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={company.file} />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${company?._id}`)}
                        className="flex items-center gap-3 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <h1>Edit</h1>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards for sm screens */}
      <div className="md:hidden flex flex-col gap-4">
        {filterCompany.map((company) => (
          <div
            key={company?._id}
            className="p-4 rounded-lg shadow-md border border-gray-200 bg-white flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={company.file} />
              </Avatar>
              <div>
                <p className="font-medium">{company?.name}</p>
                <p className="text-sm text-gray-500">{company?.createdAt?.split("T")[0]}</p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger className="cursor-pointer">
                <MoreHorizontal />
              </PopoverTrigger>
              <PopoverContent className="w-32">
                <div
                  onClick={() => navigate(`/admin/companies/${company?._id}`)}
                  className="flex items-center gap-3 w-fit cursor-pointer"
                >
                  <Edit2 className="w-4" />
                  <h1>Edit</h1>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanesTable;
