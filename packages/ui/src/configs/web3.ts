import { ChainId, Config } from "@usedapp/core";

const web3: Config = {
	readOnlyChainId: ChainId.Rinkeby,
	readOnlyUrls: {
		[ChainId.Rinkeby]: process.env.NEXT_PUBLIC_RPC_URL,
		[ChainId.Hardhat]: "http://localhost:8545",
	},
	supportedChains: [ChainId.Hardhat, ChainId.Rinkeby],
};

export default web3;
