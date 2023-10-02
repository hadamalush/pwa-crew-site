import { MongoClient } from "mongodb";

export async function connectDatabase() {
	const client = await MongoClient.connect(
		`mongodb+srv://poncyman:${process.env.MONGODB_PASS}@cluster0.fcgw1gl.mongodb.net/Auth?retryWrites=true&w=majority`
	);

	return client;
}

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
	// console.log(dbCached);
	if (dbCached) {
		dbCached = dbCached;
		return dbCached;
	}
	console.log("Nie udalo sie zachowac");
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
