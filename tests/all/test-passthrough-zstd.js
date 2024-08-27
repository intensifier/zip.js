/* global URL */

import * as zip from "../../index.js";

const COMPRESSED_CONTENT = new Uint8Array([40, 181, 47, 253, 0, 88, 197, 19, 0, 70, 121, 131, 29, 96, 105, 218, 6, 155, 192, 149, 237, 167, 22, 77, 36, 52, 92, 106, 13, 248, 115, 212, 226, 205, 32, 37, 74, 7, 131, 32, 133, 7, 121, 0, 120, 0, 124, 0, 121, 116, 94, 211, 73, 28, 99, 61, 58, 201, 77, 39, 67, 233, 144, 43, 99, 214, 120, 174, 165, 62, 73, 182, 96, 46, 155, 52, 15, 58, 191, 12, 31, 174, 142, 214, 240, 29, 127, 46, 229, 59, 154, 159, 87, 176, 38, 24, 161, 133, 116, 205, 105, 88, 43, 153, 175, 150, 113, 83, 46, 60, 234, 108, 106, 150, 78, 25, 235, 90, 113, 203, 9, 94, 93, 206, 229, 215, 188, 72, 28, 205, 112, 183, 120, 208, 87, 47, 46, 150, 62, 232, 141, 249, 192, 147, 60, 122, 41, 39, 91, 53, 37, 150, 120, 136, 15, 106, 87, 214, 167, 211, 49, 167, 248, 54, 209, 125, 150, 78, 65, 182, 61, 182, 172, 71, 51, 86, 108, 158, 26, 26, 124, 171, 165, 104, 141, 21, 45, 173, 18, 178, 190, 96, 153, 132, 191, 12, 223, 51, 143, 199, 139, 207, 203, 241, 209, 220, 91, 205, 88, 121, 75, 72, 89, 205, 121, 146, 249, 36, 107, 88, 203, 249, 188, 57, 41, 133, 203, 152, 69, 107, 253, 88, 83, 120, 205, 102, 204, 15, 118, 77, 51, 231, 108, 153, 102, 189, 177, 134, 77, 75, 23, 153, 109, 24, 111, 125, 178, 84, 208, 22, 198, 219, 210, 62, 221, 183, 102, 99, 13, 159, 233, 150, 243, 43, 96, 132, 214, 50, 78, 57, 119, 135, 184, 204, 11, 102, 116, 93, 155, 123, 99, 59, 91, 178, 116, 148, 152, 177, 226, 38, 107, 84, 210, 196, 115, 86, 156, 118, 92, 211, 26, 72, 96, 196, 109, 58, 102, 61, 41, 69, 254, 198, 59, 175, 104, 135, 25, 231, 230, 90, 211, 12, 112, 165, 79, 188, 207, 180, 244, 169, 12, 177, 162, 37, 106, 97, 60, 232, 35, 6, 4, 35, 110, 51, 235, 32, 39, 35, 165, 32, 101, 144, 239, 13, 117, 46, 103, 25, 46, 247, 129, 191, 151, 100, 232, 110, 243, 197, 209, 182, 7, 30, 130, 142, 11, 154, 226, 102, 204, 249, 196, 65, 151, 174, 57, 233, 91, 226, 116, 208, 153, 58, 89, 226, 198, 87, 7, 70, 188, 76, 243, 91, 2, 136, 219, 180, 186, 10, 195, 51, 99, 78, 90, 177, 174, 240, 225, 105, 21, 173, 188, 113, 196, 160, 62, 43, 103, 192, 8, 252, 50, 172, 230, 186, 19, 43, 46, 77, 181, 12, 151, 89, 82, 230, 188, 150, 30, 235, 118, 225, 172, 75, 71, 225, 219, 180, 121, 144, 41, 150, 15, 87, 133, 156, 123, 165, 139, 76, 112, 241, 80, 228, 11, 61, 135, 43, 153, 234, 141, 45, 149, 30, 188, 77, 55, 48, 226, 246, 246, 101, 213, 54, 241, 16, 159, 237, 57, 173, 126, 25, 150, 206, 37, 191, 66, 134, 226, 220, 76, 35, 39, 33, 95, 93, 45, 3, 140, 200, 61, 178, 74, 43, 238, 97, 198, 127, 6, 38, 32, 48, 130, 35, 64, 140, 30, 99, 137, 21, 169, 97, 13, 38, 20, 93, 16, 126, 72, 208, 190, 28, 170, 92, 159, 221, 14, 78, 64, 235, 150, 212, 247, 85, 25, 2, 153, 181, 125, 45, 14, 192, 185, 238, 106, 104, 192, 60, 28, 185, 9, 31, 204, 120, 25, 72, 172, 25, 59, 186, 29, 184, 249, 64, 225, 29, 232, 45, 30, 32, 34, 252, 227, 238, 23, 181, 213, 135, 237, 219, 8, 141, 19, 180, 22, 185, 8, 87, 152, 187, 203, 65, 70, 214, 126, 128, 62, 119, 4, 75, 14, 234, 12]);
const url = new URL("./../data/lorem-zstd.zip", import.meta.url).href;

export { test };

async function test() {
	let zipReader = new zip.ZipReader(new zip.HttpReader(url, { preventHeadRequest: true }));
	let entries = await zipReader.getEntries();
	let data = await entries[0].getData(new zip.Uint8ArrayWriter(), { passThrough: true });
	await zipReader.close();
	if (data.length != entries[0].compressedSize) {
		throw new Error();
	}
	for (let i = 0; i < data.length; i++) {
		if (data[i] != COMPRESSED_CONTENT[i]) {
			throw new Error();
		}
	}
	const zipWriter = new zip.ZipWriter(new zip.BlobWriter());
	const { uncompressedSize, signature, compressionMethod } = entries[0];
	await zipWriter.add(entries[0].filename, new zip.Uint8ArrayReader(data), { passThrough: true, uncompressedSize, signature, compressionMethod });
	const blob = await zipWriter.close();
	zipReader = new zip.ZipReader(new zip.BlobReader(blob), { passThrough: true });
	entries = await zipReader.getEntries();
	data = await entries[0].getData(new zip.Uint8ArrayWriter());
	await zipReader.close();
	if (data.length != COMPRESSED_CONTENT.length) {
		throw new Error();
	}
	for (let i = 0; i < data.length; i++) {
		if (data[i] != COMPRESSED_CONTENT[i]) {
			throw new Error();
		}
	}
	await zip.terminateWorkers();
}