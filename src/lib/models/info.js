import mongoose from "mongoose";

export const infoModelFn = async ({ db, collection }) => {
  const client = await db;
  const schema = new mongoose.Schema(
    {
      id: {
        type: String,
      },
      title: {
        type: String,
      },
      mode: {
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
