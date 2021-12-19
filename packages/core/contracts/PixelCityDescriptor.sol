// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "base64-sol/base64.sol";

import "./interfaces/IPixelCityDescriptor.sol";

contract PixelCityDescriptor is IPixelCityDescriptor, Ownable {
	// Link to the unrevealed image.
	string public unrevealedURI;
	// Simple description.
	string public lore;

	// All traits with names and SVGs.
	PixelCityLibrary.Trait[] public accessories;
	PixelCityLibrary.Trait[] public faces;
	PixelCityLibrary.Trait[] public tees;
	PixelCityLibrary.Trait[] public heads;

	constructor(string memory _unrevealedURI, string memory _lore) {
		unrevealedURI = _unrevealedURI;
		lore = _lore;
	}

	/*	___________                .__   __           	*/
	/*	\__    ___/_______ _____   |__|_/  |_   ______	*/
	/*	  |    |   \_  __ \\__  \  |  |\   __\ /  ___/	*/
	/*	  |    |    |  | \/ / __ \_|  | |  |   \___ \ 	*/
	/*	  |____|    |__|   (____  /|__| |__|  /____  >	*/
	/*	                        \/                 \/ 	*/

	function _addAccesory(PixelCityLibrary.Trait calldata _accessory) internal {
		accessories.push(_accessory);
	}

	function _addFace(PixelCityLibrary.Trait calldata _face) internal {
		faces.push(_face);
	}

	function _addTee(PixelCityLibrary.Trait calldata _tee) internal {
		tees.push(_tee);
	}

	function _addHead(PixelCityLibrary.Trait calldata _head) internal {
		heads.push(_head);
	}

	function addAccessory(PixelCityLibrary.Trait calldata _accessory)
		external
		onlyOwner
	{
		_addAccesory(_accessory);
	}

	function addFace(PixelCityLibrary.Trait calldata _face) external onlyOwner {
		_addFace(_face);
	}

	function addTee(PixelCityLibrary.Trait calldata _tee) external onlyOwner {
		_addTee(_tee);
	}

	function addHead(PixelCityLibrary.Trait calldata _head) external onlyOwner {
		_addHead(_head);
	}

	function addManyAccessories(PixelCityLibrary.Trait[] calldata _accessories)
		external
		onlyOwner
	{
		for (uint256 i = 0; i < _accessories.length; i++) {
			_addAccesory(_accessories[i]);
		}
	}

	function addManyFaces(PixelCityLibrary.Trait[] calldata _faces)
		external
		onlyOwner
	{
		for (uint256 i = 0; i < _faces.length; i++) {
			_addFace(_faces[i]);
		}
	}

	function addManyTees(PixelCityLibrary.Trait[] calldata _tees)
		external
		onlyOwner
	{
		for (uint256 i = 0; i < _tees.length; i++) {
			_addTee(_tees[i]);
		}
	}

	function addManyHeads(PixelCityLibrary.Trait[] calldata _heads)
		external
		onlyOwner
	{
		for (uint256 i = 0; i < _heads.length; i++) {
			_addHead(_heads[i]);
		}
	}

	/*		________                                           __                   	*/
	/*	 /  _____/   ____    ____    ____  _______ _____   _/  |_   ____  _______ 	*/
	/*	/   \  ___ _/ __ \  /    \ _/ __ \ \_  __ \\__  \  \   __\ /  _ \ \_  __ \	*/
	/*	\    \_\  \\  ___/ |   |  \\  ___/  |  | \/ / __ \_ |  |  (  <_> ) |  | \/	*/
	/*	 \______  / \___  >|___|  / \___  > |__|   (____  / |__|   \____/  |__|   	*/
	/*	        \/      \/      \/      \/              \/                        	*/

	function _randomize(uint256 _nonce, string memory _salt)
		internal
		view
		returns (uint256)
	{
		uint256 _seed = uint256(
			keccak256(abi.encodePacked(msg.sender, block.timestamp, block.difficulty))
		);
		return uint256(keccak256(abi.encodePacked(_seed, _nonce, _salt)));
	}

	function _genAccessory(uint256 _tokenId) internal view returns (uint256) {
		uint256 seed = _randomize(_tokenId, "Accessory") % accessories.length;
		return uint256(seed);
	}

	function _genFace(uint256 _tokenId) internal view returns (uint256) {
		uint256 seed = _randomize(_tokenId, "Face") % faces.length;
		return uint256(seed);
	}

	function _genTee(uint256 _tokenId) internal view returns (uint256) {
		uint256 seed = _randomize(_tokenId, "Tee") % tees.length;
		return uint256(seed);
	}

	function _genHead(uint256 _tokenId) internal view returns (uint256) {
		uint256 seed = _randomize(_tokenId, "Head") % heads.length;
		return uint256(seed);
	}

	function genPixel(uint256 _tokenId)
		external
		view
		returns (PixelCityLibrary.Pixel memory)
	{
		return
			PixelCityLibrary.Pixel(
				_genAccessory(_tokenId),
				_genFace(_tokenId),
				_genTee(_tokenId),
				_genHead(_tokenId)
			);
	}

	/*	 ____ ___ __________ .___ 	*/
	/*	|    |   \\______   \|   |	*/
	/*	|    |   / |       _/|   |	*/
	/*	|    |  /  |    |   \|   |	*/
	/*	|______/   |____|_  /|___|	*/
	/*	                  \/      	*/

	function setLore(string memory _lore) external onlyOwner {
		lore = _lore;
	}

	function setUnrevealedURI(string memory _unrevealedURI) external onlyOwner {
		unrevealedURI = _unrevealedURI;
	}

	function _genAttribute(string memory _type, string memory _value)
		internal
		pure
		returns (string memory)
	{
		/* solhint-disable */
		return
			string(
				abi.encodePacked(
					'{"trait_type": "',
					_type,
					'", "value": "',
					_value,
					'"}'
				)
			);
		/* solhint-disable */
	}

	function _genImage(string memory _png) internal pure returns (string memory) {
		return
			string(
				abi.encodePacked(
					'<image x="0" y="0" width="16" height="16" image-rendering="pixelated" preserveAspectRatio="xMidYMid" xlink:href="data:image/png;base64,',
					_png,
					'"/>'
				)
			);
	}

	function genSVG(PixelCityLibrary.Pixel memory _pixel)
		public
		view
		returns (string memory)
	{
		string memory accessory = accessories[_pixel.accessory].png;
		string memory face = faces[_pixel.face].png;
		string memory tee = tees[_pixel.tee].png;
		string memory head = heads[_pixel.head].png;

		/* solhint-disable */
		string memory output = string(
			abi.encodePacked(
				'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="pixel" width="100%" height="100%" version="1.1" viewBox="0 0 16 16">',
				_genImage(head),
				_genImage(face),
				_genImage(tee),
				_genImage(accessory),
				"<style>#pixel{shape-rendering: crispedges; image-rendering: -webkit-crisp-edges; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges; image-rendering: pixelated; -ms-interpolation-mode: nearest-neighbor;}</style></svg>"
			)
		);
		/* solhint-disable */

		output = string(
			abi.encodePacked(
				"data:image/svg+xml;base64,",
				Base64.encode(bytes(output))
			)
		);

		return output;
	}

	function baseTokenURI(uint256 _tokenId)
		external
		view
		returns (string memory)
	{
		// solint-disable
		string memory output = string(
			abi.encodePacked(
				'{"name": "Pixel City #',
				Strings.toString(_tokenId),
				'", "description": "',
				lore,
				'", "image": "',
				unrevealedURI,
				'"}'
			)
		);
		// solint-disable

		return
			string(
				abi.encodePacked(
					"data:application/json;base64,",
					Base64.encode(bytes(output))
				)
			);
	}

	function tokenURI(uint256 _tokenId, PixelCityLibrary.Pixel memory _pixel)
		external
		view
		returns (string memory)
	{
		string memory accessory = accessories[_pixel.accessory].value;
		string memory face = faces[_pixel.face].value;
		string memory tee = tees[_pixel.tee].value;
		string memory head = heads[_pixel.head].value;

		/* solhint-disable */
		string memory output = string(
			abi.encodePacked(
				'{"name":"Pixel City #',
				Strings.toString(_tokenId),
				'","description":"',
				lore,
				'", "attributes": [',
				_genAttribute("Accessory", accessory),
				",",
				_genAttribute("Face", face),
				",",
				_genAttribute("Tee", tee),
				",",
				_genAttribute("Head", head),
				'], "image": "',
				genSVG(_pixel),
				'"}'
			)
		);
		/* solhint-disable */

		output = string(
			abi.encodePacked(
				"data:application/json;base64,",
				Base64.encode(bytes(output))
			)
		);

		return output;
	}
}
