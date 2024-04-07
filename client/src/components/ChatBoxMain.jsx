import { useAuthContext } from "../../context/AuthContext";
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { useState } from "react";

const ChatBoxMain = ({
  dayMode,
  selectedChat,
  conversation,
  setConversation,
}) => {
  const [message, setMessage] = useState("");
  const { authUser } = useAuthContext();

  const handleSubmitMessage = async (e, msg) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedChat._id}`,
        {
          message: msg,
        }
      );

      const newMsg = [...conversation, data];
      setConversation(newMsg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-[70%] w-full">
      {selectedChat ? (
        <div className="w-full h-full flex flex-col">
          <div className="bg-white p-3 w-full rounded-tr-lg">
            <h2 className="font-semibold">{selectedChat.username}</h2>
          </div>
          <div className="w-full h-full">
            {conversation.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-2xl font-semibold">
                  Feels empty here 😔. Send a message!
                </p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col gap-2 justify-end">
                {conversation.map((msg) => {
                  return (
                    <div
                      key={msg._id}
                      className={`w-full py-2 px-10 flex ${
                        authUser.id === msg.sender
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {authUser.id === msg.sender ? (
                        <p className="bg-blue-500">hi</p>
                      ) : (
                        <p>what?</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <form
            className="p-4 relative"
            onSubmit={(e) => handleSubmitMessage(e, message)}
          >
            <input
              placeholder="write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="px-2 py-3 rounded-lg w-full outline-none"
            />
            <button>
              <IoIosSend className="absolute text-2xl right-4 top-1/2 -translate-y-1/2 -translate-x-1/2" />
            </button>
          </form>
        </div>
      ) : (
        <div className={`w-full h-full flex items-center justify-center`}>
          <div
            className={`flex flex-col items-center gap-3 ${
              !dayMode && "text-white"
            }`}
          >
            <p className="text-3xl">
              Welcome{" "}
              <span className="capitalize font-semibold">
                {authUser.fullname}
              </span>{" "}
              👋
            </p>
            <p>Select a chat to start a conversation.</p>
            <IoChatbubblesSharp className="text-5xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBoxMain;
