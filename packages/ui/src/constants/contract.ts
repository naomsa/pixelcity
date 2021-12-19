import { ChainId } from "@usedapp/core";

import abi from "./abis/token";

export const TOKEN_ADDRESS: { [chain: string]: string } = {
	[ChainId.Hardhat]: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
	[ChainId.Rinkeby]: "0x068C429ab240A288c74d9C4230a0e5d82e6A3c7D",
};

export const TOKEN_ABI = abi;
