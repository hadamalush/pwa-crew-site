import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {};
}

export async function connectDb(databaseName) {
  if (cached[databaseName]) {
    return cached[databaseName];
  }

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  cached[databaseName] = await mongoose.connect(
    `mongodb+srv://poncyman:${process.env.MONGODB_PASS}@cluster0.fcgw1gl.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
    opts
  );

  return cached[databaseName];
}

export async function findDocumentMongoose(conn, collection, document) {
  const model = await conn.model(collection);
  console.log(model);
  console.log(document);
  const existingDocument = model.findOne({ document });

  return existingDocument;
}
