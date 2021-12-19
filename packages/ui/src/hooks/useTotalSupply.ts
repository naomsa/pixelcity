import { useContractCall, useEthers } from "@usedapp/core";

import { TOKEN_ADDRESS, TOKEN_ABI } from "../constants/contract";
import buildCall from "../utils/buildCall";

function useTotalSupply() {
	const { chainId } = useEthers();

	const [totalSupply]: any =
		useContractCall(
			buildCall(TOKEN_ABI, TOKEN_ADDRESS[chainId], "totalSupply")
		) ?? [];

	return totalSupply;
}

export default useTotalSupply;
