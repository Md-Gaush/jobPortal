import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const UploadProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const [isLoading,setIsLoading] = useState(false)

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);

    try {
     setIsLoading(true)
      const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
        withCredentials: true,
      });
      dispatch(setAuthUser(res?.data?.user));
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.log(error);
    } finally {
     setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-md sm:max-w-lg mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-4">
          {[
            { label: "Name", name: "fullname", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Number", name: "phoneNumber", type: "tel" },
            { label: "Bio", name: "bio", type: "text" },
            { label: "Skills", name: "skills", type: "text" },
            { label: "Resume", name: "file", type: "file" },
          ].map((field) => (
            <div
              key={field.name}
              className="flex flex-col sm:flex-row sm:items-center gap-2"
            >
              <Label className="sm:w-32">{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                value={field.type !== "file" ? input[field.name] : undefined}
                onChange={
                  field.type === "file" ? fileChangeHandler : changeEventHandler
                }
                className="flex-1"
              />
            </div>
          ))}

          <DialogFooter>
            {isLoading ? (
              <Button className="w-full my-2 flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Please Wait...
              </Button>
            ) : (
              <Button type="submit" className="w-full my-2">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadProfileDialog;
