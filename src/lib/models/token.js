import mongoose from "mongoose";

export const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
    },
  },
  { collection: "Token" }
);

export const tokenSchemaFn = async (db) => {
  const client = await db;

  return client.models.Token || client.model("Token", tokenSchema);
};

export default mongoose.models.Token || mongoose.model("Token", tokenSchema);
