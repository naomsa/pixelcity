import getTraits from "../assets/getTraits";
import { PixelCityDescriptor } from "../typechain";

export default async function (contract: PixelCityDescriptor) {
	const { accessories, faces, heads, tees } = getTraits();

	await contract.addManyAccessories(accessories);
	await contract.addManyTees(tees);
	await contract.addManyFaces(faces);
	await contract.addManyHeads(heads);
}
