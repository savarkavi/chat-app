import ChatBox from "@/components/ChatBox";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";

const Home = () => {
  const [dayMode, setDayMode] = useState(true);

  return (
    <div
      className={`h-screen bg-[url('./assets/${
        dayMode ? "day.png" : "night.jpeg"
      }')] bg-cover bg-no-repeat flex justify-center items-center relative`}
    >
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <Switch onCheckedChange={() => setDayMode((prev) => !prev)} />
        {dayMode ? (
          <BsSunFill className="text-2xl" />
        ) : (
          <FaMoon className="text-2xl text-white" />
        )}
      </div>
      <ChatBox dayMode={dayMode} />;
    </div>
  );
};

export default Home;
