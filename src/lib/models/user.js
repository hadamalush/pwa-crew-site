import mongoose from "mongoose";

export const userModel = new mongoose.Schema(
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

export const userModelFn = async (db) => {
  const client = await db;

  return client.models.Auth || client.model("Auth", userModel);
};

export default mongoose.models.Auth || mongoose.model("Auth", userModel);
