import { ChainId, Config } from "@usedapp/core";

const web3: Config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`,
    [ChainId.Hardhat]: "http://localhost:8545",
  },
  supportedChains: [ChainId.Hardhat, ChainId.Rinkeby],
};

export default web3;
