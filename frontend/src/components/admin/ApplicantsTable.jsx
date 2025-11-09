import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const shortListing = ["accepted", "rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating status");
      console.log(error);
    }
  };

  if (!applicants || applicants?.applications?.length === 0) {
    return <p className="text-center my-4">No applicants yet.</p>;
  }

  return (
    <div className="w-full">
      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableCaption>A list of your recently applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>FullName</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants?.applications?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item?.applicant?.profile?.resume}
                      className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    "NA"
                  )}
                </TableCell>
                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 space-y-2">
                      {shortListing?.map((list, i) => (
                        <button
                          key={i}
                          onClick={() => statusHandler(list, item._id)}
                          className="block w-full text-left hover:text-blue-600 cursor-pointer"
                        >
                          {list}
                        </button>
                      ))}
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
        {applicants?.applications?.map((item) => (
          <div
            key={item._id}
            className="p-4 rounded-lg shadow-md border border-gray-200 bg-white"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{item?.applicant?.fullname}</p>
                <p className="text-sm text-gray-500">{item?.applicant?.email}</p>
                <p className="text-sm text-gray-500">{item?.applicant?.phoneNumber}</p>
              </div>
              <Popover>
                <PopoverTrigger className="cursor-pointer">
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32 space-y-2">
                  {shortListing?.map((list, i) => (
                    <button
                      key={i}
                      onClick={() => statusHandler(list, item._id)}
                      className="block w-full text-left hover:text-blue-600 cursor-pointer"
                    >
                      {list}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <p className="text-sm">
                Resume:{" "}
                {item?.applicant?.profile?.resume ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item?.applicant?.profile?.resume}
                    className="text-blue-600 hover:underline hover:text-blue-800"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  "NA"
                )}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Applied on: {item?.applicant?.createdAt.split("T")[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantsTable;
