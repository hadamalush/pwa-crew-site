import HomeStartContent from "@/components/Content/HomeStartContent";
import {
	connectDbMongo,
	deleteDocument,
	findDocument,
	updateDocument,
} from "@/lib/mongodb";
import { insertLimitByIp } from "@/lib/protection/protection";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const ActivationPage = async ({ params }) => {
	const activationId = params.activation;
	const ip = headers().get("x-forwarded-for");

	let isValid = false,
		status,
		foundDocument,
		clientActivationLinks;

	//limit request for ip ,because we didnt want
	const result = await insertLimitByIp("ActivationPage", ip, 5, 86400);

	if (result?.limit) {
		redirect("/");
	}

	try {
		clientActivationLinks = await connectDbMongo("ActivationLinks");
	} catch (error) {
		return (status = 503);
	}

	try {
		foundDocument = await findDocument(clientActivationLinks, "Registration", {
			generatedIdLink: activationId,
		});
	} catch (error) {
		return (status = 500);
	}

	if (!foundDocument) {
		redirect("/");
	}

	if (foundDocument && !status) {
		const { email } = foundDocument;
		let clientAuth;

		try {
			clientAuth = await connectDbMongo("Auth");
		} catch (error) {
			return (status = 503);
		}

		try {
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
		} catch (error) {
			return (status = 500);
		}
	}

	const statusCode = status ? `Status: ${status}` : "";

	const title = isValid
		? "Aktywacja konta się powiodła"
		: `Aktywacja konta się nie powiodła. ${statusCode}`;
	const text = isValid
		? "Życzymy miłego dnia."
		: "Prosimy o kontakt z administratorem.";

	return <HomeStartContent title={title} text={text} />;
};

export default ActivationPage;
