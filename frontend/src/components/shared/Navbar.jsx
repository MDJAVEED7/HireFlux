import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import { LogOut, User2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constant"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Logout failed")
    }
  }

  return (
    <nav className="bg-[#043873] sticky top-0 z-50 shadow-md">
  <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-12">
    {/* Logo */}
    <Link to="/" className="flex items-center space-x-2">
      <h1 className="text-3xl font-extrabold text-[#FFE492]">
        Hire<span className="text-[#4F9CF9]">Flux</span>
      </h1>
    </Link>

    {/* Navigation Links */}
    <ul className="hidden md:flex space-x-8 font-semibold text-white">
      {user && user.role === "recruiter" ? (
        <>
          <li>
            <Link
              to="/admin/companies"
              className="hover:text-[#4F9CF9] transition-colors duration-200"
            >
              Companies
            </Link>
          </li>
          <li>
            <Link
              to="/admin/jobs"
              className="hover:text-[#4F9CF9] transition-colors duration-200"
            >
              Jobs
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              to="/"
              className="hover:text-[#4F9CF9] transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className="hover:text-[#4F9CF9] transition-colors duration-200"
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/browse"
              className="hover:text-[#4F9CF9] transition-colors duration-200"
            >
              Browse
            </Link>
          </li>
        </>
      )}
    </ul>

    {/* Auth Buttons & User Avatar */}
    <div className="flex items-center space-x-4">
      {!user ? (
        <>
          <Link to="/login">
            <Button variant="outline" className="px-6 py-2 font-medium border-[#4F9CF9]  bg-[#4F9CF9] text-black hover:bg-[#4F9CF9] hover:border-[#518bce]">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-[#FFE492] hover:bg-[#FFD85C] px-6 py-2 font-medium text-[#043873]">
              Signup
            </Button>
          </Link>
        </>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer ring-2 ring-[#FFE492] bg-white hover:ring-[#4F9CF9] transition-all duration-300">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  "https://github.com/shadcn.png"
                }
                alt={user?.fullname || "@default"}
              />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-64 rounded-lg shadow-lg border border-[#FFE492] p-4 bg-[#043873]  text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar>
                <AvatarImage className="bg-white"
                  src={
                    user?.profile?.profilePhoto ||
                    "https://github.com/shadcn.png"
                  }
                  alt={user?.fullname || "@default"}
                />
              </Avatar>
              <div>
                <h4 className="text-lg font-semibold">{user?.fullname}</h4>
                <p className="text-sm text-[#FFE492] truncate max-w-[200px]">
                  {user?.profile?.bio || "No bio available"}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              {user?.role === "student" && (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-[#4F9CF9] hover:text-[#FFE492] font-medium"
                >
                  <User2 />
                  View Profile
                </Link>
              )}
              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 text-[#FFB347] hover:text-[#FFD85C] font-semibold"
              >
                <LogOut />
                Logout
              </button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  </div>
</nav>

  )
}

export default Navbar
