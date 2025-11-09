


import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔹 Logout handler
  const loggedOutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(setAuthUser(null));
      toast.success(res?.data?.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      console.log(error);
    }
  };

  // 🔹 Active link style
  const getLinkClass = (path) =>
    location.pathname === path
      ? "text-[#6A38C2] font-semibold border-b-2 border-[#6A38C2]"
      : "text-gray-700 hover:text-[#6A38C2] transition-all";

  // 🔹 Navigation Links
  const renderLinks = () => {
    if (user?.role === "recruiter") {
      return (
        <>
          <li>
            <Link to="/admin/companies" className={getLinkClass("/admin/companies")}>
              Companies
            </Link>
          </li>
          <li>
            <Link to="/admin/jobs" className={getLinkClass("/admin/jobs")}>
              Jobs
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/" className={getLinkClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className={getLinkClass("/jobs")}>
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/browse" className={getLinkClass("/browse")}>
              Browse
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6 cursor-pointer">
            {renderLinks()}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="relative cursor-pointer h-12 w-12">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4 my-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h1 className="font-medium">
                      {user?.fullname?.toUpperCase()}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {user.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut />
                    <Button
                      onClick={loggedOutHandler}
                      variant="link"
                      className="cursor-pointer"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <ul className="flex flex-col gap-4 p-4 font-medium">{renderLinks()}</ul>

          {!user ? (
            <div className="flex flex-col gap-3 p-4">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full">Signup</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 p-4">
              {user.role === "student" && (
                <Button variant="outline" onClick={() => navigate("/profile")}>
                  View Profile
                </Button>
              )}
              <Button
                onClick={loggedOutHandler}
                variant="destructive"
                className="w-full"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;


