import path from "path";
import fs from "fs/promises";
import type { PathLike } from "fs";

import getTraits from "./getTraits";

async function removeIfExists(path: PathLike) {
	try {
		await fs.rm(path);
	} catch {}
}

(async function outputTraits() {
	const { accessories, faces, tees, heads } = await getTraits();

	const output = path.resolve(__dirname, "output.json");
	await removeIfExists(output);

	await fs.appendFile(output, "[");
	for (let traits of [accessories, faces, tees, heads]) {
		for (let trait of traits) {
			await fs.appendFile(output, JSON.stringify([trait.value, trait.png]));
			if (trait !== heads[heads.length]) await fs.appendFile(output, ",");
		}
	}
	await fs.appendFile(output, "]");
})();
