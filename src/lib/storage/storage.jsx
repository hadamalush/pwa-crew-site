import { File } from "megajs";

//pass table of links as argument, returns promise
export const allDownloadBuffersMegaNz = async megaLinks => {
	if (!megaLinks) {
		return;
	}

	const buffers = await Promise.all(
		megaLinks.map(async link => {
			const file = File.fromURL(link);
			await file.loadAttributes();
			const data = await file.downloadBuffer();

			return data;
		})
	);

	return buffers;
};

// pass array of buffers
export const allConvertFromBuffersToBase64 = buffers => {
	if (!buffers) {
		return;
	}

	const convertedBuffers = buffers.map(buffer => {
		const base64 = buffer.toString("base64");

		return base64;
	});

	return convertedBuffers;
};

export const oneDownloadBuffersMegaNz = async megaLink => {
	if (!megaLink) {
		return;
	}
	const file = File.fromURL(megaLink);
	await file.loadAttributes();
	const buffer = await file.downloadBuffer();

	return buffer;
};

export const oneConvertFromBuffersToBase64 = buffer => {
	if (!buffer) {
		return;
	}

	const convertedBuffer = buffer.toString("base64");

	return convertedBuffer;
};
