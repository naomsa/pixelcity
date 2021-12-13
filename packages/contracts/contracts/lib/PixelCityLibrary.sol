// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library PixelCityLibrary {
	struct Trait {
		string value;
		string png;
	}

	struct Pixel {
		uint256 accessory;
		uint256 face;
		uint256 tee;
		uint256 head;
	}
}
