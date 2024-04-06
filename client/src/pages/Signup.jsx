import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleChangeFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeCheckbox = (e) => {
    if (e.target.name === "male") {
      setFormData((prev) => ({
        ...prev,
        gender: e.target.checked ? "male" : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        gender: e.target.checked ? "female" : "",
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`api/auth/signup`, formData);
      toast.success("Account created. Please Sign In");
      navigate("/signin");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#141516] to-[#1A2536]">
      <div className="w-full max-w-[1100px] h-[800px] border border-white rounded-lg bg-transparent backdrop-blur-sm flex">
        <div className="flex-[50%] w-full h-full rounded-lg">
          <img
            src="/giphy2.gif"
            alt="signin-img"
            className="h-full object-cover rounded-l-lg"
          />
        </div>
        <div className="flex-[50%] w-full flex flex-col justify-between p-6">
          <h1 className="text-white text-5xl font-bold text-center">Sign Up</h1>
          <form
            className="flex flex-col gap-8 text-sm"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label htmlFor="fullname" className="text-white text-xl">
                Fullname
              </label>
              <input
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChangeFormData}
                className="border p-2 outline-none w-full rounded-lg mt-2"
              />
            </div>
            <div>
              <label htmlFor="username" className="text-white text-xl">
                Username
              </label>
              <input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChangeFormData}
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
                name="password"
                value={formData.password}
                onChange={handleChangeFormData}
                className="border p-2 outline-none w-full rounded-lg mt-2"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-white text-xl">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChangeFormData}
                className="border p-2 outline-none w-full rounded-lg mt-2"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex gap-2 text-white">
                <label>Male</label>
                <input
                  type="checkbox"
                  className="outline-none"
                  name="male"
                  checked={formData.gender === "male"}
                  onChange={handleChangeCheckbox}
                />
              </div>
              <div className="flex gap-2 text-white">
                <label>Female</label>
                <input
                  type="checkbox"
                  className="outline-none"
                  name="female"
                  checked={formData.gender === "female"}
                  onChange={handleChangeCheckbox}
                />
              </div>
            </div>
            <button className="bg-black px-2 py-3 rounded-lg text-white">
              Sign Up
            </button>
          </form>
          <div className="flex gap-2 text-white">
            <p>Already have an account?</p>
            <Link to="/signin" className="underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
