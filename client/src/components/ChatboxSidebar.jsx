import { CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";
import axios from "axios";

const ChatboxSidebar = ({
  users,
  setAuthUser,
  dayMode,
  setConversation,
  selectedChat,
  setSelectedChat,
}) => {
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/signout");
      localStorage.removeItem("currentUser");
      setAuthUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleGetConversation = async (user) => {
    setSelectedChat(user);

    const { data } = await axios.get(`/api/messages/${user._id}`);
    setConversation(data);
    console.log(data);
  };

  return (
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
                    ? selectedChat?._id === user._id
                      ? "border-white bg-gray-200 rounded-lg"
                      : "border-white hover:bg-gray-200"
                    : selectedChat?._id === user._id
                    ? "border-zinc-700 bg-zinc-700 rounded-lg"
                    : "border-zinc-700 hover:bg-zinc-700"
                } p-3 cursor-pointer hover:rounded-lg  transition-all`}
                onClick={() => handleGetConversation(user)}
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
  );
};

export default ChatboxSidebar;
