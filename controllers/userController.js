const User = require("../models/Submission/users");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

exports.postUser = async (req, res) => {
  const userData = req.body.user;
  if (!userData) {
    return res.status(400).json({ error: "User data is required" });
  }

  try {
    let user = await User.findOne({ email: userData.email });

    if (user) {
      user.latestLogin = new Date();
      await user.save();
      console.log("User login updated:", user);
      res.status(200).json({ message: "User login updated successfully" });
    } else {
      user = await User.create(userData);
      console.log("User created:", user);
      res.status(201).json({ message: "User created successfully", userId: user._id });
    }
  } catch (err) {
    console.error("Error creating or updating user:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
