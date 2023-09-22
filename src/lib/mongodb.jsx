import { MongoClient } from "mongodb";

export async function connectDatabase() {
	const client = await MongoClient.connect(
		`mongodb+srv://poncyman:${process.env.MONGODB_PASS}@cluster0.fcgw1gl.mongodb.net/Auth?retryWrites=true&w=majority`
	);

	return client;
}

export async function insertDocument(client, collection, document) {
	const db = client.db();

	const result = await db.collection(collection).insertOne(document);

	return result;
}

export async function findDocument(client, collection, document) {
	const db = client.db();
	const existingDocument = await db.collection(collection).findOne(document);

	return existingDocument;
}
