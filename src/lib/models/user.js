import mongoose from "mongoose";

export const userModelFn = async ({ db, collection }) => {
  const client = await db;
  const schema = new mongoose.Schema(
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
    { collection: collection }
  );

  return client.models[collection] || client.model(collection, schema);
};
