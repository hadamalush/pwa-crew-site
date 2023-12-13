import mongoose from "mongoose";

export const userMainModelFn = async ({ db, collection }) => {
  const client = await db;
  const schema = new mongoose.Schema(
    {
      email: {
        type: String,
      },
      password: {
        type: String,
      },
      username: {
        type: String,
      },
      avatarSrc: {
        type: String,
      },
      isActivated: {
        type: Boolean,
      },
      newsletter: {
        type: Boolean,
      },
      createAt: {
        type: Date,
      },
    },
    { collection: collection }
  );

  return client.models[collection] || client.model(collection, schema);
};
