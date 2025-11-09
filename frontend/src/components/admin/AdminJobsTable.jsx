import React, { Fragment, useEffect, useState } from "react";
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
import { MoreHorizontal, Edit2, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.jobs);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs || []);

  useEffect(() => {
    const filteredJob = (allAdminJobs || []).filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.companyId?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJob);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-[600px]">
        <TableCaption>A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Company Name</TableHead>
            <TableHead className="min-w-[150px]">Role</TableHead>
            <TableHead className="min-w-[120px]">Date</TableHead>
            <TableHead className="text-right min-w-[120px]">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                You Haven't Registered Any Jobs Yet.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job) => (
              <Fragment key={job?._id}>
                <TableRow>
                  <TableCell>{job?.companyId?.name}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger className="cursor-pointer">
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div className="flex items-center gap-3 w-fit cursor-pointer">
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          className="flex items-center gap-3 w-fit cursor-pointer mt-2"
                          onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)}
                        >
                          <Eye className="w-5" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
