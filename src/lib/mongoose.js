import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDb(databaseName) {
  if (cached.conn && cached.conn.name === databaseName) {
    return cached.conn;
  }

  if (!cached.promise || cached.promise.name !== databaseName) {
    const uri = `mongodb+srv://poncyman:${process.env.MONGODB_PASS}@cluster0.fcgw1gl.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
    cached.promise = mongoose.createConnection(uri);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectDb(databaseName) {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(
//         `mongodb+srv://poncyman:${process.env.MONGODB_PASS}@cluster0.fcgw1gl.mongodb.net/${databaseName}?retryWrites=true&w=majority`
//       )
//       .then((mongoose) => {
//         return mongoose;
//       });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

export async function findDocumentMongoose(conn, collection, document) {
  const model = await conn.model(collection);
  console.log(model);
  console.log(document);
  const existingDocument = model.findOne({ document });

  return existingDocument;
}
