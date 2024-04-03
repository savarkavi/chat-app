import ChatBox from "@/components/ChatBox";

const Home = () => {
  return (
    <div className="h-screen bg-[url('./assets/day.png')] bg-cover bg-no-repeat flex justify-center items-center">
      <ChatBox />;
    </div>
  );
};

export default Home;
