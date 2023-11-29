import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { collection: "Auth" }
);

export default mongoose.models.Auth || mongoose.model("Auth", userModel);
