import { MongoClient } from "mongodb";

export async function connectDatabase() {
	const client = await MongoClient.connect(
		`mongodb+srv://poncyman:${process.env.MONGODB_PASS}@cluster0.fcgw1gl.mongodb.net/Auth?retryWrites=true&w=majority`
	);

	return client;
}

export const connectDbMongo = async database => {
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

	const result = await collection.createIndex(
		{ createdAt: 1 },
		{ expireAfterSeconds: 1800 }
	);

	return result;
};

export const updateDocument = async (
	client,
	collection,
	filter,
	documentUpdate
) => {
	const db = client.db();
	const updatedDocument = await db
		.collection(collection)
		.updateOne(filter, documentUpdate);

	return updatedDocument;
};
