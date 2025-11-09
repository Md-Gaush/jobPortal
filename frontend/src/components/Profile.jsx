import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, PenIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import UploadProfileDialog from "./UploadProfileDialog";
import { useSelector } from "react-redux";
import useGetAllApplyJob from "@/hooks/useGetAllApplyJobs";

const Profile = () => {
  useGetAllApplyJob();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-6 sm:p-8">
        {/* Header: Avatar + Name + Edit */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  "https://img.freepik.com/premium-vector/company-logo-design_697972-452.jpg"
                }
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl sm:text-2xl">
                {user?.fullname?.toUpperCase()}
              </h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            className="self-start sm:self-auto mt-2 sm:mt-0"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <PenIcon />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <Mail className="flex-shrink-0" />
            <span className="break-all">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Contact className="flex-shrink-0" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h1 className="font-semibold text-xl sm:text-2xl mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills?.map((item, i) => <Badge key={i}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-6">
          <Label className="font-bold text-lg sm:text-xl text-red-600 block mb-1">
            Resume
          </Label>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={`${user?.profile?.resume}`}
              className="text-blue-500 hover:underline break-all"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6 mt-6">
        <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
        <AppliedJobsTable />
      </div>

      {/* Upload Profile Dialog */}
      <UploadProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
