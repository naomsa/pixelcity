import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { PixelCityToken, PixelCityDescriptor } from "../typechain";
import fillTraits from "../helpers/fillTraits";
import getTraits from "../assets/getTraits";

describe("Token", () => {
	let token: PixelCityToken;
	let descriptor: PixelCityDescriptor;
	let [owner, addr1, addr2]: SignerWithAddress[] = [];

	const { accessories, faces, heads, tees } = getTraits();

	beforeEach(async () => {
		descriptor = await (
			await ethers.getContractFactory("PixelCityDescriptor")
		).deploy("__ipfs__", "__lore__");

		token = await (
			await ethers.getContractFactory("PixelCityToken")
		).deploy(descriptor.address);

		await fillTraits(descriptor);
		[owner, addr1, addr2] = await ethers.getSigners();
	});

	describe("Init", () => {
		it("Should return correct ERC721 details", async () => {
			const name = await token.name();
			const symbol = await token.symbol();
			expect(name).to.equal("Pixel City");
			expect(symbol).to.equal("PIXEL");
		});

		it("Should return correct intializer variables", async () => {
			const _descriptor = await token.descriptor();
			const maxMintAmount = await token.maxMintAmount();
			const maxSupply = await token.maxSupply();
			const isActive = await token.isActive();

			expect(_descriptor).to.equal(descriptor.address);
			expect(maxMintAmount).to.equal(8);
			expect(maxSupply).to.equal(128);
			expect(isActive).to.equal(false);
		});
	});

	describe("Minting", () => {
		beforeEach(async () => {
			await token.setIsActive(true);
		});

		describe("claimPixels", async () => {
			it("Should correctly mint 1 token to addr1", async () => {
				await token.connect(addr1).claimPixels(1);
				expect(await token.balanceOf(addr1.address)).to.equal(1);
				expect(await token.totalSupply()).to.equal(1);
			});

			it("Should correctly mint 2 token to addr1", async () => {
				await token.connect(addr1).claimPixels(2);
				expect(await token.balanceOf(addr1.address)).to.equal(2);
				expect(await token.totalSupply()).to.equal(2);
			});

			it("Should correctly mint 3 token to addr1", async () => {
				await token.connect(addr1).claimPixels(3);
				expect(await token.balanceOf(addr1.address)).to.equal(3);
				expect(await token.totalSupply()).to.equal(3);
			});

			it("Should correctly mint 4 token to addr1", async () => {
				await token.connect(addr1).claimPixels(4);
				expect(await token.balanceOf(addr1.address)).to.equal(4);
				expect(await token.totalSupply()).to.equal(4);
			});

			it("Should correctly mint 5 token to addr1", async () => {
				await token.connect(addr1).claimPixels(5);
				expect(await token.balanceOf(addr1.address)).to.equal(5);
				expect(await token.totalSupply()).to.equal(5);
			});

			it("Should correctly mint 6 token to addr1", async () => {
				await token.connect(addr1).claimPixels(6);
				expect(await token.balanceOf(addr1.address)).to.equal(6);
				expect(await token.totalSupply()).to.equal(6);
			});

			it("Should correctly mint 7 token to addr1", async () => {
				await token.connect(addr1).claimPixels(7);
				expect(await token.balanceOf(addr1.address)).to.equal(7);
				expect(await token.totalSupply()).to.equal(7);
			});

			it("Should correctly mint 8 token to addr1", async () => {
				await token.connect(addr1).claimPixels(8);
				expect(await token.balanceOf(addr1.address)).to.equal(8);
				expect(await token.totalSupply()).to.equal(8);
			});

			it("Should revert on unexpected amount", async () => {
				await expect(token.connect(addr1).claimPixels(0)).to.be.revertedWith(
					"Invalid mint amount"
				);
				await expect(token.connect(addr1).claimPixels(9)).to.be.revertedWith(
					"Invalid mint amount"
				);
			});

			it("Should revert when address cap reached", async () => {
				await token.connect(addr1).claimPixels(8);
				await expect(token.connect(addr1).claimPixels(1)).to.be.revertedWith(
					"Address mint cap reached"
				);
			});

			it("Should revert when not active", async () => {
				await token.setIsActive(false);
				await expect(token.connect(addr1).claimPixels(1)).to.be.revertedWith(
					"Sale is not active"
				);
			});
		});

		describe("claimPixelsTo", async () => {
			it("Should correctly run function mintTo", async () => {
				await token.connect(addr1).claimPixelsTo(addr2.address, 1);
				expect(await token.balanceOf(addr2.address)).to.equal(1);
				expect(await token.totalSupply()).to.equal(1);
			});

			it("Should revert on unexpected amount", async () => {
				await expect(
					token.connect(addr1).claimPixelsTo(addr2.address, 0)
				).to.be.revertedWith("Invalid mint amount");
				await expect(
					token.connect(addr1).claimPixelsTo(addr2.address, 9)
				).to.be.revertedWith("Invalid mint amount");
			});

			it("Should revert when address cap reached", async () => {
				await token.connect(addr1).claimPixels(8);
				await expect(token.claimPixelsTo(addr1.address, 1)).to.be.revertedWith(
					"Address mint cap reached"
				);
			});

			it("Should revert when not active", async () => {
				await token.setIsActive(false);
				await expect(
					token.connect(addr1).claimPixelsTo(addr2.address, 1)
				).to.be.revertedWith("Sale is not active");
			});
		});
	});

	describe("Metadata", () => {
		describe("pixelTraits", () => {
			it("Should set correct trait values for token minted", async () => {
				await token.claimPixels(1);
				const traits = await token.pixelTraits(0);
				for (let i = 0; i < 4; i++) {
					const length =
						i === 0
							? accessories.length
							: i === 1
							? faces.length
							: i === 2
							? tees.length
							: heads.length;
					expect(traits[i].toNumber()).to.greaterThanOrEqual(0);
					expect(traits[i].toNumber()).to.lessThanOrEqual(length);
				}
			});
		});

		describe("tokenURI", () => {
			it("Should revert when querying nonexisting token", async () => {
				await expect(token.tokenURI(0)).to.be.revertedWith(
					"Query for nonexisting token Id"
				);
			});

			it("Should return unrevelead URI", async () => {
				await token.claimPixels(1);
				const uri = await token.tokenURI(0);

				const buff = Buffer.from(uri.slice(29), "base64");
				const { image } = JSON.parse(buff.toString("ascii"));

				expect(image).to.equal("__ipfs__");
			});
		});
	});

	describe("Withdrawing", () => {
		const value = ethers.utils.parseEther("10");
		const safeGas = ethers.utils.parseEther("0.1");
		beforeEach(async () => {
			await token.setIsActive(true);
		});

		it("Should withdraw ether amount", async () => {
			await token.connect(addr1).claimPixels(2, { value });

			const before = await owner.getBalance();
			await token.withdrawEther(value.div(2));
			const after = await owner.getBalance();

			const newValue = ethers.utils.parseEther("5");
			const expected = before.add(newValue).sub(safeGas);
			expect(after.gte(expected)).to.be.true;
		});
	});
});
