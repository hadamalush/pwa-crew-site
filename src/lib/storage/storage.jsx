import { File } from "megajs";
import sharp from "sharp";
import { Readable } from "nodemailer/lib/xoauth2";

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

/**
 * @description This function will resize image and change format of image to webp
 * @param {Buffer} buffer Enter buffer of image.
 * @param {Number} width Enter width of image.
 * @param {Number} height Enter hight of image.
 * @returns Buffer.
 */

export const convertImageWithSharp = async (buffer, width, height) => {
	return new Promise((resolve, reject) => {
		sharp(buffer)
			.resize(width, height)
			.toFormat("webp")
			.toBuffer((error, convertedBuffer) => {
				if (error) {
					return reject(error);
				}

				resolve(convertedBuffer);
			});
	});
};

// CLOUDINARY

export const uploadStream = (buffer, options, cldConfig) => {
	console.log("NO I SIE WYKONUJE1");
	return new Promise((res, rej) => {
		const upload_stream = cldConfig.v2.uploader.upload_stream(
			options,
			(err, result) => {
				if (err) return rej(err);
				res(result);

				console.log("RESUUUUUUUUUUUULT:", result);
				console.log("SEcUUre", result.secure_url);
			}
		);

		console.log("UPLOAD: ", upload_stream);
		let str = Readable.from(buffer);
		str.pipe(upload_stream);
		console.log("dsad");
	});
};
