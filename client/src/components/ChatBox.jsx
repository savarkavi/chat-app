/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import ChatboxSidebar from "./ChatboxSidebar";
import ChatBoxMain from "./ChatBoxMain";

const ChatBox = ({ dayMode }) => {
  const [users, setUsers] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const { authUser, setAuthUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSidebarUsers = async () => {
      const { data } = await axios.get(`/api/users`);
      setUsers(data);
    };

    fetchSidebarUsers();
  }, []);

  if (!authUser) {
    return navigate("/signin");
  }

  return (
    <div
      className={`w-full max-w-[800px] h-[600px] border flex ${
        dayMode ? "border-white" : "border-black"
      } rounded-lg bg-transparent backdrop-blur-md flex`}
    >
      <ChatboxSidebar
        users={users}
        setAuthUser={setAuthUser}
        dayMode={dayMode}
        setConversation={setConversation}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
      <ChatBoxMain
        dayMode={dayMode}
        selectedChat={selectedChat}
        conversation={conversation}
        setConversation={setConversation}
      />
    </div>
  );
};

export default ChatBox;
