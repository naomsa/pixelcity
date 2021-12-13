import fs from "fs";
import path from "path";

function getTraits() {
	const accessories = [];
	const tees = [];
	const faces = [];
	const heads = [];

	for (let [index, dir] of ["accessory", "face", "tee", "head"].entries()) {
		const dirpath = path.resolve(__dirname, dir);
		const files = fs.readdirSync(dirpath);

		for (let f of files) {
			const fpath = path.join(dirpath, f);

			const png = fs.readFileSync(fpath, "base64");
			const value = path.parse(f).name.replace("_", " ");

			const entry = { value, png };

			index === 0
				? accessories.push(entry)
				: index === 1
				? tees.push(entry)
				: index === 2
				? faces.push(entry)
				: heads.push(entry);
		}
	}

	return { accessories, tees, faces, heads };
}

export default getTraits;
