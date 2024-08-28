import jwt from "jsonwebtoken";
import "dotenv/config";

const generateToken = (user_id) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET , {
    expiresIn: "30d",
  });

  return token;
};

export default generateToken;