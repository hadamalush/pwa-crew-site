import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDbAdmin() {
  console.log("idzie");
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(
        `mongodb+srv://poncyman:${process.env.MONGODB_PASS}@cluster0.fcgw1gl.mongodb.net/AdminB?retryWrites=true&w=majority`,
        opts
      )
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export async function findDocumentMongoose(conn, collection, document) {
  const model = await conn.model(collection);
  console.log(model);
  console.log(document);
  const existingDocument = model.findOne({ document });

  return existingDocument;
}
