import { ethers, network, run } from "hardhat";

import fillTraits from "../helpers/fillTraits";

const VERIFY = network.name !== "localhost";
async function main() {
	const descriptor = await (
		await ethers.getContractFactory("PixelCityDescriptor")
	).deploy("__ipfs__", "__lore__");

	await descriptor.deployed();

	const token = await (
		await ethers.getContractFactory("PixelCityToken")
	).deploy(descriptor.address);
	await token.deployed();

	console.log("Token deployed to:", token.address);
	console.log("Descriptor deployed to:", descriptor.address);

	await fillTraits(descriptor);

	if (VERIFY) {
		await run("verify:verify", {
			address: descriptor.address,
			constructorArguments: ["__ipfs__", "__lore__"],
		});
		await run("verify:verify", {
			address: token.address,
			constructorArguments: [descriptor.address],
		});
	}
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
