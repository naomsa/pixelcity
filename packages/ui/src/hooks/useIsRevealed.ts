import { useContractCall, useEthers } from "@usedapp/core";

import { TOKEN_ADDRESS, TOKEN_ABI } from "../constants/contract";
import buildCall from "../utils/buildCall";

function useIsRevealed() {
	const { chainId } = useEthers();

	const [isRevealed]: any =
		useContractCall(
			buildCall(TOKEN_ABI, TOKEN_ADDRESS[chainId], "isRevealed")
		) ?? [];

	return isRevealed;
}

export default useIsRevealed;
