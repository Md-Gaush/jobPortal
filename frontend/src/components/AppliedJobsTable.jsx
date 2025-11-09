import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobsTable = () => {
  const { allApplyiedJob } = useSelector((store) => store.jobs);

  return (
    <div className="overflow-x-auto w-full">
      {allApplyiedJob.length <= 0 ? (
        <p className="text-center py-4">You haven't applied to any job yet.</p>
      ) : (
        <Table className="min-w-[600px]">
          <TableCaption>List of your applied jobs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allApplyiedJob.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell className="font-medium text-sm sm:text-base">
                  {appliedJob.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-sm sm:text-base">
                  {appliedJob?.job?.title}
                </TableCell>
                <TableCell className="text-sm sm:text-base">
                  {appliedJob?.job?.companyId?.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={
                      appliedJob.status === "accepted"
                        ? "bg-green-500 text-white"
                        : appliedJob.status === "rejected"
                        ? "bg-red-500 text-white"
                        : "bg-gray-400 text-white"
                    }
                  >
                    {appliedJob.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AppliedJobsTable;
