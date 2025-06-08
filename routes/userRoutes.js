import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"; // ✅ correct package name is 'bcrypt'
import jwt from "jsonwebtoken";

const SECRET_KEY = "helloworld";
const userRouter = express.Router();

// Register route
userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    const hashPassword = await bcrypt.hash(pass, 10);
    const result = await userModel.create({ name, email, pass: hashPassword });
    res.json({ message: "User registered successfully", user: result });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login route
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const matchPassword = await bcrypt.compare(pass, user.pass);
    if (!matchPassword) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
    return res.json({
      token,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

// Get user by email (or ID, but assuming email)
userRouter.get("/:id", async (req, res) => {
  const email = req.params.id;
  try {
    const result = await userModel.findOne({ email });
    if (!result) return res.status(404).json({ message: "User not found" });
    return res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// Get only user's name by email
userRouter.get("/:id/name", async (req, res) => {
  const email = req.params.id;
  try {
    const result = await userModel.findOne({ email }, { _id: 0, name: 1 });
    if (!result) return res.status(404).json({ message: "User not found" });
    return res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching name" });
  }
});

export default userRouter;
