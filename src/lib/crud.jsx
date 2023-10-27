import {
	findDocument,
	insertDocument,
	updateAllDocuments,
	updateDocument,
} from "./mongodb";
import { nanoid } from "nanoid";

/**
 * @description The function creates an additional object for the user in the notification database, if one is not already created. If it is created, it updates the notification status
 * @example const dataNotifi = {
		email: email,
		actionTextPL: "Zarejestrowałeś się pomyślnie.",
		actionTextEN: "You have registered successfully",
		href: "/events",
	};

	const result = await addNotification(
		clientNotifi,
		"Notifications",
		dataNotifi
	);
    
 * @param {Object} client Enter client.
 * @param {String} collection Enter collection. For this project should be 'Notifications'
 * @param {Object} data Data should be include this properties: required: email | optional: actionTextPL, actionTextEN,title, href
 * @param {Boolean} all Enter true if you want to add notification for all the users.
 * @returns {Promise} addNotification returns a promise object that resolves to the result of the operation of adding a notification to the database.
 */

export const addNotification = async (client, collection, data, all) => {
	const notifiId = nanoid();
	const username = data?.email.split("@")[0];

	const newNotification = {
		action_text_pl: data?.actionTextPL,
		action_text_en: data?.actionTextEN,
		title: data?.title,
		href: data?.href,
		action: data?.action,
		status: data?.status,
		owner: username,
		createdDate: new Date(),
	};

	const foundUser = await findDocument(client, collection, {
		email: data.email,
	});

	if (!foundUser) {
		const newDocument = {
			email: data.email,
			notifications: { [notifiId]: newNotification },
		};

		const result = await insertDocument(client, collection, newDocument);

		return result;
	}
	if (all) {
		const result = await updateAllDocuments(
			client,
			collection,
			newNotification,
			notifiId
		);

		return result;
	} else {
		const currentNotifications = foundUser.notifications;
		const updatedNotifications = {
			[notifiId]: newNotification,
			...currentNotifications,
		};
		const filter = { email: data.email };

		const updatedDocument = { $set: { notifications: updatedNotifications } };
		const result = updateDocument(client, collection, filter, updatedDocument);

		return result;
	}
};
