import User from "../models/user.model.js";
import bycrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePicture: profilePic,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      profilePicture: newUser.profilePicture,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Sorry something went wrong" });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Wrong Username or Password" });
    }

    const isPasswordCorrect = await bycrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Wrong Username or Password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePicture: user.profilePicture,
      token: res.cookie,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Sorry something went wrong" });
  }
};

export const signout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Sorry something went wrong" });
  }
};
