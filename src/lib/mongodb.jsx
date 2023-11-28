import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://poncyman:${process.env.MONGODB_PASS}@cluster0.fcgw1gl.mongodb.net/Auth?retryWrites=true&w=majority`
  );

  return client;
}

export const connectDbMongo = async (database) => {
  const client = await MongoClient.connect(
    `mongodb+srv://poncyman:${process.env.MONGODB_PASS}@cluster0.fcgw1gl.mongodb.net/${database}?retryWrites=true&w=majority`
  );

  return client;
};

export async function connectDatabaseEvents() {
  const client = await MongoClient.connect(
    `mongodb+srv://poncyman:${process.env.MONGODB_PASS}@cluster0.fcgw1gl.mongodb.net/Events?retryWrites=true&w=majority`
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

let dbCached = null;

export async function connectDb() {
  if (dbCached) {
    dbCached = dbCached;
    return dbCached;
  }

  const client = await connectDatabaseEvents();
  const db = client.db();
  dbCached = db;

  return db;
}

export async function findDocument(client, collection, document) {
  const db = client.db();
  const existingDocument = await db.collection(collection).findOne(document);

  return existingDocument;
}

export const createCollectionWithTTL = async (client, nameCollection) => {
  const collection = client.db().collection(nameCollection);

  const result = await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 1800 });

  return result;
};

/**
 *
 * @param {Object} client Enter client. You can use function connectDbMongo().
 * @param {String} nameCollection Enter name of collection. (String)
 * @param {Object} document Enter object should have field - createdAt. Example: {email : 'example@test.com', createdAt: new Date() }
 * @param {Number} expireTime Enter time after which document will delete.
 * @returns Return result.
 */

export const insertDocumentWithTTL = async (client, nameCollection, document, expireTime) => {
  const db = client.db();

  await db
    .collection(nameCollection)
    .createIndex({ createdAt: 1 }, { expireAfterSeconds: expireTime });

  const result = await db.collection(nameCollection).insertOne(document);

  return result;
};

export const updateDocument = async (client, collection, filter, documentUpdate) => {
  const db = client.db();
  const updatedDocument = await db.collection(collection).updateOne(filter, documentUpdate);

  return updatedDocument;
};

export const updateAllDocuments = async (client, collection, filter, document) => {
  const db = client.db();
  const result = await db.collection(collection).updateMany(filter, document);

  return result;
};

export const updateAllNestedDocuments = async (client, collection, document, key) => {
  const db = client.db();

  const result = await db.collection(collection).updateMany(
    {},
    {
      $set: {
        [`notifications.${key}`]: document,
      },
    }
  );

  return result;
};

export const deleteDocument = async (client, collection, document) => {
  const db = client.db();
  const deletedDocument = db.collection(collection).deleteOne(document);

  return deletedDocument;
};
