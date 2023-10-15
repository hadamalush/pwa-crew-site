export const generalConfig = {
	/* Setting where to upload and download files */
	/* Option 'local' you should using only in localhost! */
	/* Info: Mega is slow because must be download buffer and then convert to base64 */

	/* STORAGE */

	uploadImageStorageEvent: "cloudinary", //local - only working on localhost! | cloudinary | vercelBlob - fast | mega - slow | all - will be send to all bases
	downloadImageStorageEvent: ["cloudinary", "mega", "vercelBlob"], // options: 'mega', 'vercelBlob' - The first option takes precedence if will be empty then will be use second option.

	/* EMAILS */

	receiveEmailAddresContact: "pwacrewcompany@gmail.com", // Enter your email address to which messages will be sent from contact page.
	defaultReplyMessage:
		"Dziekujemy za zgłoszenie,\n postaramy się jak najszybciej odpowiedzieć na ten email. \n Z poważaniem PwaCrew.",
	emailSignature: "\nZ poważaniem PwaCrew.",
	domain: "pwa-crew-site-demo.vercel.app", // This domain will be used to activation accounts. (Creating links for users.)
};
