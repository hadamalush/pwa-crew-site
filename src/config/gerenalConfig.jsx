export const generalConfig = {
	/* Setting where to upload and download files */
	/* Info: If you set downloadImageStorage for example 'mega' and the event does not contain a file then will take from another storage */
	uploadImageStorageEvent: "mega", //local - only working on localhost! | vercelBlob - fast | mega - slow | all - will be send to all bases
	downloadImageStorageEvent: ["mega", "vercelBlob"], //local - only working on localhost! | vercelBlob - fast | mega - slow |
};
