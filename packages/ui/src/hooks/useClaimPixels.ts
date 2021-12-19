import { useContractFunction, useEthers } from "@usedapp/core";
import { Contract } from "ethers";

import { TOKEN_ADDRESS, TOKEN_ABI } from "../constants/contract";

function useClaimPixels() {
	const { chainId } = useEthers();

	const contract = new Contract(TOKEN_ADDRESS[chainId], TOKEN_ABI);
	const { send: claim, state: claimState } = useContractFunction(
		contract,
		"claimPixels",
		{
			transactionName: "Claim a pixel",
		}
	);

	return { claim, claimState };
}

export default useClaimPixels;
