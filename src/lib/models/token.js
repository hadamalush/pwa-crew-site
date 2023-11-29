import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
    },
  },
  { collection: "Token" }
);

export default mongoose.models.Token || mongoose.model("Token", tokenSchema);
