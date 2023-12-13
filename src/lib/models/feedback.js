import mongoose from "mongoose";

export const feedbackModelFn = async ({ db, collection }) => {
  const client = await db;
  const schema = new mongoose.Schema(
    {
      mode: {
        type: String,
      },
      email: {
        type: String,
      },
      textHTML: {
        type: String,
      },
    },
    { collection: collection }
  );

  return client.models[collection] || client.model(collection, schema);
};
