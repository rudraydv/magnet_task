const User = require('../models/userModel');
const bcryptjs  = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const generateToken = require("../utils/generateToken");


const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existUser = await User.findOne({ email });
  
      if (existUser) {
        return res.status(400).json({ message: "User already exists." });
      }
  
      const hashedPassword = await bcryptjs.hash(password, 10);
  
      const createUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
  
      await createUser.save();
      res.status(201).json({ message: "User created successfully" });
  
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
    
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
    
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const logout = async (req, res) => {
    try {
      // Clear the cookie
      res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  

module.exports = {signup,login, logout};