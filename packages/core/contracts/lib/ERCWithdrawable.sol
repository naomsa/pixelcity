// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

abstract contract ERCWithdrawable {
	/*  All functions in this abstract contract are marked as internal because it should
        generally be paired with ownable.
        Virtual is for overwritability.
    */
	function _withdrawERC20(address contractAddress_, uint256 amount_)
		internal
		virtual
	{
		IERC20(contractAddress_).transferFrom(address(this), msg.sender, amount_);
	}

	function _withdrawERC721(address contractAddress_, uint256 tokenId_)
		internal
		virtual
	{
		IERC721(contractAddress_).transferFrom(address(this), msg.sender, tokenId_);
	}

	function _withdrawERC1155(
		address contractAddress_,
		uint256 tokenId_,
		uint256 amount_
	) internal virtual {
		IERC1155(contractAddress_).safeTransferFrom(
			address(this),
			msg.sender,
			tokenId_,
			amount_,
			""
		);
	}

	function _withdrawERC1155Batch(
		address contractAddress_,
		uint256[] calldata ids_,
		uint256[] calldata amounts_
	) internal virtual {
		IERC1155(contractAddress_).safeBatchTransferFrom(
			address(this),
			msg.sender,
			ids_,
			amounts_,
			""
		);
	}
}
