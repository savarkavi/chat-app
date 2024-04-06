import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const userInfo = req.body;

    const user = await User.findById(loggedInUser);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userInfo.newFullname) {
      user.fullname = userInfo.newFullname;
    }

    if (userInfo.newUsername) {
      user.username = userInfo.newUsername;
    }

    await user.save();

    res.status(200).json({
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
