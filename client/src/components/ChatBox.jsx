import axios from "axios";
import { useEffect } from "react";

const ChatBox = () => {
  useEffect(() => {
    const fetchSidebarUsers = async () => {
      const data = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
      console.log(data);
    };

    fetchSidebarUsers();
  }, []);

  return (
    <div className="w-full max-w-[800px] h-[500px] border border-white rounded-lg bg-transparent backdrop-blur-sm flex">
      <div className="flex-[30%] w-full border-r p-3 flex flex-col gap-8">
        <input
          placeholder="search..."
          className="p-2 w-full border outline-none rounded-xl"
        />
        <hr className="border border-white" />
        <div></div>
      </div>
      <div className="flex-[70%] w-full"></div>
    </div>
  );
};

export default ChatBox;
