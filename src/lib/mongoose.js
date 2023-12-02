import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    AdminB: { conn: null, promise: null },
    Auth: { conn: null, promise: null },
  };
}

export async function connectDb(databaseName) {
  if (cached[databaseName].conn) {
    return cached[databaseName].conn;
  }

  if (!cached[databaseName].promise) {
    const uri = `mongodb+srv://poncyman:${process.env.MONGODB_PASS}@cluster0.fcgw1gl.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
    cached[databaseName].promise = mongoose.createConnection(uri);
  }

  cached[databaseName].conn = await cached[databaseName].promise;
  return cached[databaseName].conn;
}

export async function findDocumentMongoose(conn, collection, document) {
  const model = await conn.model(collection);
  console.log(model);
  console.log(document);
  const existingDocument = model.findOne({ document });

  return existingDocument;
}
