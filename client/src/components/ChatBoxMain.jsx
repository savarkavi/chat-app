import { useAuthContext } from "../../context/AuthContext";
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { useState } from "react";
import { format } from "date-fns";

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

      if (conversation) {
        const newMsg = [...conversation.messages, data];
        setConversation({ ...conversation, messages: newMsg });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-[70%] w-full h-full">
      {selectedChat ? (
        <div className="w-full h-full flex flex-col">
          <div
            className={`${
              dayMode ? "bg-white" : "bg-zinc-700 text-white"
            } p-3 w-full rounded-tr-lg`}
          >
            <h2 className="font-semibold">{selectedChat.username}</h2>
          </div>
          <div className="w-full h-full overflow-y-scroll py-4">
            <div
              className={`w-full ${
                !conversation && "h-full"
              } flex items-center`}
            >
              {!conversation ? (
                <div className="w-full h-full flex justify-center items-center">
                  <p
                    className={`text-2xl font-semibold ${
                      !dayMode && "text-white"
                    }`}
                  >
                    Feels empty here 😔. Send a message!
                  </p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col gap-2 justify-end">
                  {conversation.messages.map((msg) => {
                    return (
                      <div
                        key={msg._id}
                        className={`w-full px-10 flex ${
                          authUser.id === msg.sender
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {authUser.id === msg.sender ? (
                          <div className="w-[250px] flex justify-end gap-3">
                            <div className="chat chat-end flex flex-col gap-1 w-full">
                              <p className="bg-blue-500 chat-bubble text-white font-semibold">
                                {msg.message}
                              </p>
                              <span
                                className={`text-sm font-semibold ${
                                  dayMode ? "text-black" : "text-white"
                                }`}
                              >
                                {format(msg.createdAt, "hh:mm aaaa")}
                              </span>
                            </div>
                            <img
                              src={conversation.participants[0].profilePicture}
                              className="w-10 h-10"
                            />
                          </div>
                        ) : (
                          <div className="w-[250px] flex flex-row-reverse justify-end gap-3">
                            <div className="chat chat-start flex flex-col gap-1 w-full">
                              <p className="bg-green-500 chat-bubble text-white font-semibold">
                                {msg.message}
                              </p>
                              <span
                                className={`text-sm font-semibold ${
                                  dayMode ? "text-black" : "text-white"
                                }`}
                              >
                                {format(msg.createdAt, "hh:mm aaaa")}
                              </span>
                            </div>
                            <img
                              src={conversation.participants[1].profilePicture}
                              className="w-10 h-10"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <form
            className="p-4 relative"
            onSubmit={(e) => handleSubmitMessage(e, message)}
          >
            <input
              placeholder="write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`px-2 py-3 rounded-lg w-full outline-none ${
                dayMode ? "bg-white" : "bg-zinc-700 text-white"
              }`}
            />
            <button>
              <IoIosSend
                className={`absolute text-2xl right-4 top-1/2 -translate-y-1/2 -translate-x-1/2 ${
                  !dayMode && "text-white"
                }`}
              />
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
