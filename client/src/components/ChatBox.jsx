/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChatBox = ({ dayMode }) => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSidebarUsers = async () => {
      const { data } = await axios.get(`/api/users`);
      setUsers(data);
      console.log(data);
    };

    fetchSidebarUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/signout");
      localStorage.removeItem("currentUser");
      toast.success("Logged out successfully");
      navigate("/signin");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`w-full max-w-[800px] h-[500px] border ${
        dayMode ? "border-white" : "border-black"
      } rounded-lg bg-transparent backdrop-blur-md flex`}
    >
      <div
        className={`flex-[30%] w-full border-r ${
          dayMode ? "border-white" : "border-black"
        } p-3 flex flex-col justify-between`}
      >
        <div className="flex flex-col gap-8">
          <input
            placeholder="search..."
            className={`p-2 w-full border ${
              !dayMode && "bg-zinc-700 text-white"
            } outline-none rounded-xl`}
          />

          <div className="flex flex-col gap-2">
            {users.map((user) => {
              return (
                <div
                  key={user._id}
                  className={`flex items-center gap-4 border-b ${
                    dayMode
                      ? "border-white hover:bg-gray-200"
                      : "border-zinc-700 hover:bg-zinc-700"
                  } p-3 cursor-pointer hover:rounded-lg  transition-all`}
                >
                  <img
                    src={user.profilePicture}
                    alt="profile pic"
                    className="w-12 h-12"
                  />
                  <h2
                    className={`capitalize text-lg ${
                      dayMode ? "text-black" : "text-white"
                    }`}
                  >
                    {user.fullname}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`flex gap-2 items-center ${
            !dayMode && "text-white"
          } cursor-pointer`}
          onClick={handleLogout}
        >
          <h2>Logout</h2>
          <CiLogout />
        </div>
      </div>
      <div className="flex-[70%] w-full"></div>
    </div>
  );
};

export default ChatBox;
