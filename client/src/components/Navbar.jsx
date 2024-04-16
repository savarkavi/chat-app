import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Navbar = ({ dayMode, setDayMode }) => {
  const { authUser, setAuthUser } = useAuthContext();
  const [newFullname, setNewFullname] = useState(authUser?.fullname);
  const [newUsername, setNewUsername] = useState(authUser?.username);

  if (!authUser) {
    return <Navigate to="/signin" />;
  }

  const handleIpdateUser = async (e, formData) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/users/updateUser`, formData);
      setAuthUser(data);
      setNewFullname(data.fullname);
      setNewUsername(data.username);

      localStorage.setItem("currentUser", JSON.stringify(data));
      toast.success("Profile updated!");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="absolute top-4 right-4 flex items-center gap-3">
      <Switch onCheckedChange={() => setDayMode((prev) => !prev)} />
      {dayMode ? (
        <BsSunFill className="text-2xl" />
      ) : (
        <FaMoon className="text-2xl text-white" />
      )}

      <Dialog>
        <DialogTrigger>
          <div className="cursor-pointer">
            <img
              src={authUser?.profilePicture}
              alt="profile picture"
              className="w-10 h-10 border border-black rounded-full"
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit your profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-6 items-end w-1/2 translate-x-1/2"
            onSubmit={(e) => handleIpdateUser(e, { newFullname, newUsername })}
          >
            <div className="flex gap-4 items-center">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <input
                id="name"
                value={newFullname}
                onChange={(e) => setNewFullname(e.target.value)}
                className="border border-black bg-white rounded-lg p-2"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="username" className="text-right">
                Username
              </label>
              <input
                id="username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="border border-black bg-white rounded-lg p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-black rounded-lg py-2 px-3 text-sm text-white"
            >
              Save changes
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
