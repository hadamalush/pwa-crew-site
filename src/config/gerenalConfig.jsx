export const generalConfig = {
	/* Setting where to upload and download files */
	/* Option 'local' you should using only in localhost! */
	/* Info: Mega is slow because must be download buffer and then convert to base64 */

	uploadImageStorageEvent: "mega", //local - only working on localhost! | vercelBlob - fast | mega - slow | all - will be send to all bases
	downloadImageStorageEvent: ["mega", "vercelBlob"], // options: 'mega', 'vercelBlob' - The first option takes precedence if will be empty then will be use second option.
};
