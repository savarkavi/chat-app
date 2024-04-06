import ChatBox from "@/components/ChatBox";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const Home = () => {
  const [dayMode, setDayMode] = useState(true);

  return (
    <div
      className={`h-screen ${
        dayMode
          ? "bg-[url('./assets/day.png')]"
          : "bg-[url('./assets/night.jpeg')]"
      }  bg-cover bg-no-repeat flex justify-center items-center relative`}
    >
      <Navbar dayMode={dayMode} setDayMode={setDayMode} />
      <ChatBox dayMode={dayMode} />
    </div>
  );
};

export default Home;
