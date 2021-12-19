// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../lib/PixelCityLibrary.sol";

interface IPixelCityDescritor {
	function baseTokenURI(uint256 _tokenId) external view returns (string memory);

	function tokenURI(uint256 _tokenId, PixelCityLibrary.Pixel memory _pixel)
		external
		view
		returns (string memory);

	function genPixel(uint256 _tokenId)
		external
		view
		returns (PixelCityLibrary.Pixel memory);
}

interface IPixelCityToken {
	/*	                .__           ________                                    	*/
	/*	  ____    ____  |  |   ___.__.\_____  \  __  _  __  ____    ____  _______ 	*/
	/*	 /  _ \  /    \ |  |  <   |  | /   |   \ \ \/ \/ / /    \ _/ __ \ \_  __ \	*/
	/*	(  <_> )|   |  \|  |__ \___  |/    |    \ \     / |   |  \\  ___/  |  | \/	*/
	/*	 \____/ |___|  /|____/ / ____|\_______  /  \/\_/  |___|  / \___  > |__|   	*/
	/*	             \/        \/             \/               \/      \/         	*/

	function setIsActive(bool _isActive) external;

	function setIsRevealed(bool _isRevealed) external;

	function setDescriptor(IPixelCityDescritor _descriptor) external;

	/*	___________         __                     __      __ .__   __   .__         .___                         	*/
	/*	\__    ___/  ____  |  | __  ____    ____  /  \    /  \|__|_/  |_ |  |__    __| _/_______ _____   __  _  __	*/
	/*	  |    |    /  _ \ |  |/ /_/ __ \  /    \ \   \/\/   /|  |\   __\|  |  \  / __ | \_  __ \\__  \  \ \/ \/ /	*/
	/*	  |    |   (  <_> )|    < \  ___/ |   |  \ \        / |  | |  |  |   Y  \/ /_/ |  |  | \/ / __ \_ \     / 	*/
	/*	  |____|    \____/ |__|_ \ \___  >|___|  /  \__/\  /  |__| |__|  |___|  /\____ |  |__|   (____  /  \/\_/  	*/
	/*	                        \/     \/      \/        \/                   \/      \/              \/          	*/

	function withdrawERC20(address contractAddress_, uint256 amount_) external;

	function withdrawERC721(address contractAddress_, uint256 tokenId_) external;

	function withdrawERC1155(
		address contractAddress_,
		uint256 tokenId_,
		uint256 amount_
	) external;

	function withdrawERC1155Batch(
		address contractAddress_,
		uint256[] calldata ids_,
		uint256[] calldata amounts_
	) external;

	function withdrawEther(uint256 _amount) external;

	/*	   _____             __               .___          __           	*/
	/*	  /     \    ____  _/  |_ _____     __| _/_____   _/  |_ _____   	*/
	/*	 /  \ /  \ _/ __ \ \   __\\__  \   / __ | \__  \  \   __\\__  \  	*/
	/*	/    Y    \\  ___/  |  |   / __ \_/ /_/ |  / __ \_ |  |   / __ \_	*/
	/*	\____|__  / \___  > |__|  (____  /\____ | (____  / |__|  (____  /	*/
	/*	        \/      \/             \/      \/      \/             \/ 	*/

	function pixelTraits(uint256 _tokenId)
		external
		view
		returns (PixelCityLibrary.Pixel memory);

	function walletOfOwner(address address_) external returns (uint256[] memory);

	/*	   _____   .__           __   .__                  	*/
	/*	  /     \  |__|  ____  _/  |_ |__|  ____     ____  	*/
	/*	 /  \ /  \ |  | /    \ \   __\|  | /    \   / ___\ 	*/
	/*	/    Y    \|  ||   |  \ |  |  |  ||   |  \ / /_/  >	*/
	/*	\____|__  /|__||___|  / |__|  |__||___|  / \___  / 	*/
	/*	        \/          \/                 \/ /_____/  	*/

	function claimPixels(uint8 _amount) external payable;

	function claimPixelsTo(address _to, uint8 _amount) external payable;
}
