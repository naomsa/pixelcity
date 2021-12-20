import { ChainId } from "@usedapp/core";

import abi from "./abis/token";

export const TOKEN_ADDRESS: { [chain: string]: string } = {
  [ChainId.Hardhat]: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  [ChainId.Rinkeby]: "0x35a2A5b911b1F36dAeee8062C2dECDaA3cc83775",
};

export const TOKEN_ABI = abi;
