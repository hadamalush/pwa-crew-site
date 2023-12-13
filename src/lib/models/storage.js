import mongoose from "mongoose";

export const storageModelFn = async ({ db, collection }) => {
  const client = await db;
  const schema = new mongoose.Schema(
    {
      mode: {
        type: String,
      },
      uploadStorage: {
        type: String,
      },
      downloadStorages: {
        type: Array,
      },
    },
    { collection: collection }
  );

  return client.models[collection] || client.model(collection, schema);
};
