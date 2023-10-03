import { File } from "megajs";

//pass table of links as argument, returns promise
export const downloadBuffersMegaNz = async megaLinks => {
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
export const convertFromBuffersToBase64 = buffers => {
	if (!buffers) {
		return;
	}

	const convertedBuffers = buffers.map(buffer => {
		const base64 = buffer.toString("base64");

		return base64;
	});

	return convertedBuffers;
};
