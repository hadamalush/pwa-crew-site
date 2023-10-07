import {
	connectDbMongo,
	deleteDocument,
	findDocument,
	updateDocument,
} from "@/lib/mongodb";

const ActivationPage = async ({ params }) => {
	const activationId = params.activation;

	const clientActivationLinks = await connectDbMongo("ActivationLinks");

	const foundDocument = await findDocument(
		clientActivationLinks,
		"Registration",
		{
			generatedIdLink: activationId,
		}
	);

	if (foundDocument) {
		const { email } = foundDocument;

		const clientAuth = await connectDbMongo("Auth");

		const updatedDocument = await updateDocument(
			clientAuth,
			"Users",
			{ email: email },
			{ $set: { isActivated: true } }
		);

		if (updatedDocument.acknowledged) {
			const deletedDocument = await deleteDocument(
				clientActivationLinks,
				"Registration",
				{ email: email }
			);
		}
	}

	return <></>;
};

export default ActivationPage;
