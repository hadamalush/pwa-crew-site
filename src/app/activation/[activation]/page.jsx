import HomeStartContent from "@/components/Content/HomeStartContent";
import {
	connectDbMongo,
	deleteDocument,
	findDocument,
	updateDocument,
} from "@/lib/mongodb";

const ActivationPage = async ({ params }) => {
	const activationId = params.activation;
	let isValid = false;

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

			isValid = deletedDocument.acknowledged && true;
		}
	}

	const title = isValid
		? "Aktywacja konta się powiodła"
		: "Aktywacja konta się nie powiodła.";
	const text = isValid
		? "Życzymy miłego dnia."
		: "Prosimy o kontakt z administratorem.";

	return <HomeStartContent title={title} text={text} />;
};

export default ActivationPage;
