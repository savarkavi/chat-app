import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChangeFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signin`,
        formData
      );
      console.log(data);
      toast.success("You are successfully logged in");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#141516] to-[#1A2536]">
      <div className="w-full max-w-[900px] h-[500px] border border-white rounded-lg bg-transparent backdrop-blur-sm flex">
        <div className="flex-[50%] w-full h-full rounded-lg">
          <img
            src="/giphy.gif"
            alt="signin-img"
            className="h-full object-cover rounded-l-lg"
          />
        </div>
        <div className="flex-[50%] w-full flex flex-col justify-between p-6">
          <h1 className="text-white text-5xl font-bold text-center">Sign In</h1>
          <form
            className="flex flex-col gap-8 text-sm"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label htmlFor="username" className="text-white text-xl">
                Username
              </label>
              <input
                id="username"
                value={formData.username}
                onChange={handleChangeFormData}
                name="username"
                className="border p-2 outline-none w-full rounded-lg mt-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-white text-xl">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChangeFormData}
                name="password"
                className="border p-2 outline-none w-full rounded-lg mt-2"
              />
            </div>
            <button className="bg-black px-2 py-3 rounded-lg text-white">
              Sign In
            </button>
          </form>
          <div className="flex gap-2 text-white">
            <p>Dont have an account?</p>
            <a href="/signup" className="underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
