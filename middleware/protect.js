import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

import * as dotenv from "dotenv";

dotenv.config();

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Use optional chaining to handle potential undefined headers

  const JWT_SECRET = process.env.JWT_SECRET; // Assuming JWT_SECRET is a string in your .env file

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      const userId = decoded.user_id;

      const user = await User.findById(userId).select("-password");

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      // Check for specific error types like TokenExpiredError, JsonWebTokenError, etc.
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ error: "Token expired" });
      } else {
        res.status(401).json({ error: "Not authorized, invalid token" });
      }
    }
  } else {
    // No token provided
    res.status(401).json({ error: "No token provided" });
  }
};


export { protect };