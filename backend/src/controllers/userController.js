import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getUser = async (req, res) => {
  const user = await User.find()
  return res.status(200).json({ user })
}

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    const user = await newUser.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login user" });
  }
};
