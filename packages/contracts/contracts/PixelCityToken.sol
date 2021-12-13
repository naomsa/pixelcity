// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { Ultra721, Ultra721Enumerable } from "ultra721/contracts/Ultra721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./lib/ERCWithdrawable.sol";

import "./interfaces/IPixelCityToken.sol";

contract PixelCityToken is
	IPixelCityToken,
	ERCWithdrawable,
	Ultra721Enumerable,
	Pausable,
	Ownable
{
	uint8 public maxSupply;
	uint8 public maxMintAmount;

	bool public isActive;
	bool public isRevealed;

	IPixelCityDescritor public descriptor;

	mapping(uint256 => PixelCityLibrary.Pixel) internal _pixelTraits;
	mapping(address => uint8) public addressToMinted;

	modifier onlyValidTokenId(uint256 _tokenId) {
		require(_exists(_tokenId), "Query for nonexisting token Id");
		_;
	}

	constructor(IPixelCityDescritor _descriptor) Ultra721("Pixel City", "PIXEL") {
		descriptor = _descriptor;

		maxSupply = 128;
		maxMintAmount = 8;

		isActive = false;
		isRevealed = false;
	}

	/*	                .__           ________                                    	*/
	/*	  ____    ____  |  |   ___.__.\_____  \  __  _  __  ____    ____  _______ 	*/
	/*	 /  _ \  /    \ |  |  <   |  | /   |   \ \ \/ \/ / /    \ _/ __ \ \_  __ \	*/
	/*	(  <_> )|   |  \|  |__ \___  |/    |    \ \     / |   |  \\  ___/  |  | \/	*/
	/*	 \____/ |___|  /|____/ / ____|\_______  /  \/\_/  |___|  / \___  > |__|   	*/
	/*	             \/        \/             \/               \/      \/         	*/

	function setIsActive(bool _isActive) external onlyOwner {
		isActive = _isActive;
	}

	function setIsRevealed(bool _isRevealed) external onlyOwner {
		isRevealed = _isRevealed;
	}

	function setDescriptor(IPixelCityDescritor _descriptor) external onlyOwner {
		descriptor = _descriptor;
	}

	/*	___________         __                     __      __ .__   __   .__         .___                         	*/
	/*	\__    ___/  ____  |  | __  ____    ____  /  \    /  \|__|_/  |_ |  |__    __| _/_______ _____   __  _  __	*/
	/*	  |    |    /  _ \ |  |/ /_/ __ \  /    \ \   \/\/   /|  |\   __\|  |  \  / __ | \_  __ \\__  \  \ \/ \/ /	*/
	/*	  |    |   (  <_> )|    < \  ___/ |   |  \ \        / |  | |  |  |   Y  \/ /_/ |  |  | \/ / __ \_ \     / 	*/
	/*	  |____|    \____/ |__|_ \ \___  >|___|  /  \__/\  /  |__| |__|  |___|  /\____ |  |__|   (____  /  \/\_/  	*/
	/*	                        \/     \/      \/        \/                   \/      \/              \/          	*/

	function withdrawERC20(address contractAddress_, uint256 amount_)
		external
		onlyOwner
	{
		_withdrawERC20(contractAddress_, amount_);
	}

	function withdrawERC721(address contractAddress_, uint256 tokenId_)
		external
		onlyOwner
	{
		_withdrawERC721(contractAddress_, tokenId_);
	}

	function withdrawERC1155(
		address contractAddress_,
		uint256 tokenId_,
		uint256 amount_
	) external onlyOwner {
		_withdrawERC1155(contractAddress_, tokenId_, amount_);
	}

	function withdrawERC1155Batch(
		address contractAddress_,
		uint256[] calldata ids_,
		uint256[] calldata amounts_
	) external onlyOwner {
		_withdrawERC1155Batch(contractAddress_, ids_, amounts_);
	}

	function withdrawEther(uint256 _amount) external onlyOwner {
		payable(msg.sender).transfer(_amount);
	}

	/*	   _____             __               .___          __           	*/
	/*	  /     \    ____  _/  |_ _____     __| _/_____   _/  |_ _____   	*/
	/*	 /  \ /  \ _/ __ \ \   __\\__  \   / __ | \__  \  \   __\\__  \  	*/
	/*	/    Y    \\  ___/  |  |   / __ \_/ /_/ |  / __ \_ |  |   / __ \_	*/
	/*	\____|__  / \___  > |__|  (____  /\____ | (____  / |__|  (____  /	*/
	/*	        \/      \/             \/      \/      \/             \/ 	*/

	function tokenURI(uint256 _tokenId)
		public
		view
		override
		onlyValidTokenId(_tokenId)
		returns (string memory)
	{
		if (isRevealed) {
			PixelCityLibrary.Pixel memory pixel = _pixelTraits[_tokenId];
			return descriptor.tokenURI(_tokenId, pixel);
		} else {
			return descriptor.baseTokenURI(_tokenId);
		}
	}

	function walletOfOwner(address owner_)
		external
		view
		returns (uint256[] memory)
	{
		return Ultra721Enumerable._walletOfOwner(owner_);
	}

	function pixelTraits(uint256 _tokenId)
		external
		view
		onlyValidTokenId(_tokenId)
		returns (PixelCityLibrary.Pixel memory)
	{
		return _pixelTraits[_tokenId];
	}

	/*	   _____   .__           __   .__                  	*/
	/*	  /     \  |__|  ____  _/  |_ |__|  ____     ____  	*/
	/*	 /  \ /  \ |  | /    \ \   __\|  | /    \   / ___\ 	*/
	/*	/    Y    \|  ||   |  \ |  |  |  ||   |  \ / /_/  >	*/
	/*	\____|__  /|__||___|  / |__|  |__||___|  / \___  / 	*/
	/*	        \/          \/                 \/ /_____/  	*/

	function claimPixels(uint8 _amount) external payable {
		require(_amount > 0 && _amount <= maxMintAmount, "Invalid mint amount");

		uint8 _addressToMinted = addressToMinted[msg.sender];

		require(
			_addressToMinted + _amount <= maxMintAmount,
			"Address mint cap reached"
		);

		addressToMinted[msg.sender] += _amount;
		for (uint8 i = 0; i < _amount; i++) {
			_safeMint(msg.sender);
		}
	}

	function claimPixelsTo(address _to, uint8 _amount) external payable {
		require(_amount > 0 && _amount <= maxMintAmount, "Invalid mint amount");

		uint8 _addressToMinted = addressToMinted[_to];

		require(
			_addressToMinted + _amount <= maxMintAmount,
			"Address mint cap reached"
		);

		addressToMinted[msg.sender] += _amount;
		for (uint8 i = 0; i < _amount; i++) {
			_safeMint(_to);
		}
	}

	function _currentId() internal view returns (uint256) {
		return _owners.length + 1;
	}

	function _safeMint(address _to) internal {
		require(isActive || msg.sender == owner(), "Sale is not active");
		require(_to != address(0), "Invalid recipient");

		uint256 tokenId = _currentId();

		require(tokenId <= maxSupply, "Max supply reached");

		_pixelTraits[tokenId] = descriptor.genPixel(tokenId);

		super._safeMint(_to, tokenId);
	}

	/*	  _________                               	*/
	/*	 /   _____/ __ __ ______    ____  _______ 	*/
	/*	 \_____  \ |  |  \\____ \ _/ __ \ \_  __ \	*/
	/*	 /        \|  |  /|  |_> >\  ___/  |  | \/	*/
	/*	/_______  /|____/ |   __/  \___  > |__|   	*/
	/*	        \/        |__|         \/         	*/

	function pause() public onlyOwner {
		_pause();
	}

	function unpause() public onlyOwner {
		_unpause();
	}

	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 tokenId
	) internal override whenNotPaused {
		super._beforeTokenTransfer(from, to, tokenId);
	}
}
