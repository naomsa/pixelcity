import { expect } from "chai";
import { ethers } from "hardhat";

import { PixelCityDescriptor } from "../typechain";
import getTraits from "../assets/getTraits";
import fillTraits from "../helpers/fillTraits";

describe("Descriptor", () => {
	const { accessories, faces, heads, tees } = getTraits();
	let descriptor: PixelCityDescriptor;

	beforeEach(async () => {
		descriptor = await (
			await ethers.getContractFactory("PixelCityDescriptor")
		).deploy("__ipfs__", "__lore__");

		await fillTraits(descriptor);
	});

	describe("Init", () => {
		it("Should return correct lore", async () => {
			expect(await descriptor.lore()).to.equal("__lore__");
		});
	});

	describe("Traits", () => {
		it("Should have correctly set accessories", async () => {
			const max = accessories.length - 1;
			expect((await descriptor.accessories(max)).value).to.equal(
				accessories[max].value
			);
			expect((await descriptor.accessories(max)).png).to.equal(
				accessories[max].png
			);
		});

		it("Should have correctly set faces", async () => {
			const max = faces.length - 1;
			expect((await descriptor.faces(max)).value).to.equal(faces[max].value);
			expect((await descriptor.faces(max)).png).to.equal(faces[max].png);
		});

		it("Should have correctly set heads", async () => {
			const max = heads.length - 1;
			expect((await descriptor.heads(max)).value).to.equal(heads[max].value);
			expect((await descriptor.heads(max)).png).to.equal(heads[max].png);
		});

		it("Should have correctly set tees", async () => {
			const max = tees.length - 1;
			expect((await descriptor.tees(max)).value).to.equal(tees[max].value);
			expect((await descriptor.tees(max)).png).to.equal(tees[max].png);
		});

		it("Should correctly set lore", async () => {
			expect(await descriptor.lore()).to.equal("__lore__");
			await descriptor.setLore("_lore_");
			expect(await descriptor.lore()).to.equal("_lore_");
		});
	});
});
