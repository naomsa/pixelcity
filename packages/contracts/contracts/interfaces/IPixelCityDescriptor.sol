// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../lib/PixelCityLibrary.sol";

interface IPixelCityDescriptor {
	/*	___________                .__   __           	*/
	/*	\__    ___/_______ _____   |__|_/  |_   ______	*/
	/*	  |    |   \_  __ \\__  \  |  |\   __\ /  ___/	*/
	/*	  |    |    |  | \/ / __ \_|  | |  |   \___ \ 	*/
	/*	  |____|    |__|   (____  /|__| |__|  /____  >	*/
	/*	                        \/                 \/ 	*/

	function addAccessory(PixelCityLibrary.Trait memory _accessory) external;

	function addFace(PixelCityLibrary.Trait memory _face) external;

	function addTee(PixelCityLibrary.Trait memory _tee) external;

	function addHead(PixelCityLibrary.Trait memory _head) external;

	function addManyAccessories(PixelCityLibrary.Trait[] memory _accessories)
		external;

	function addManyFaces(PixelCityLibrary.Trait[] memory _faces) external;

	function addManyTees(PixelCityLibrary.Trait[] memory _tees) external;

	function addManyHeads(PixelCityLibrary.Trait[] memory _heads) external;

	/*		________                                           __                   	*/
	/*	 /  _____/   ____    ____    ____  _______ _____   _/  |_   ____  _______ 	*/
	/*	/   \  ___ _/ __ \  /    \ _/ __ \ \_  __ \\__  \  \   __\ /  _ \ \_  __ \	*/
	/*	\    \_\  \\  ___/ |   |  \\  ___/  |  | \/ / __ \_ |  |  (  <_> ) |  | \/	*/
	/*	 \______  / \___  >|___|  / \___  > |__|   (____  / |__|   \____/  |__|   	*/
	/*	        \/      \/      \/      \/              \/                        	*/

	function genPixel(uint256 _tokenId)
		external
		view
		returns (PixelCityLibrary.Pixel memory);

	/*	 ____ ___ __________ .___ 	*/
	/*	|    |   \\______   \|   |	*/
	/*	|    |   / |       _/|   |	*/
	/*	|    |  /  |    |   \|   |	*/
	/*	|______/   |____|_  /|___|	*/
	/*	                  \/      	*/

	function setLore(string memory _lore) external;

	function setUnrevealedURI(string memory _unrevealedURI) external;

	function genSVG(PixelCityLibrary.Pixel memory _pixel)
		external
		view
		returns (string memory);

	function baseTokenURI(uint256 _tokenId) external view returns (string memory);

	function tokenURI(uint256 _tokenId, PixelCityLibrary.Pixel memory _pixel)
		external
		view
		returns (string memory);
}
