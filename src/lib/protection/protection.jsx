import {
	connectDbMongo,
	createCollectionWithTTL,
	findDocument,
	insertDocument,
	updateDocument,
} from "../mongodb";

export const insertLimitByIp = async (collection, ip, requestLimit) => {
	let client, foundPosition;

	try {
		client = await connectDbMongo("Protection");
		foundPosition = await findDocument(client, collection, {
			addres_ip: ip,
		});
	} catch (error) {
		return { error: error };
	}

	if (foundPosition) {
		const { limit } = foundPosition;

		if (limit >= 5) {
			return { limit: requestLimit };
		}

		try {
			const { limit } = foundPosition;

			const updatedDocument = await updateDocument(
				client,
				collection,
				{ addres_ip: ip },
				{ $set: { limit: limit + 1 } }
			);
		} catch (error) {
			return { error: error };
		}
	} else {
		try {
			const data = {
				limit: 1,
				addres_ip: ip,
				createdAt: new Date(),
			};
			const result = await insertDocument(client, collection, data);
		} catch (error) {
			return false;
		}
	}

	return { success: true };
};
