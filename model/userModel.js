import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: true, // Uncomment if you want to make the name field required
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    jti: {
      type: String,
    },
    password: {
      type: String,
      min: 8, // Minimum length for the password
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Define the model using the model function and export it
const userModel = model("User", userSchema); // Capitalized model name for consistency
export default userModel;