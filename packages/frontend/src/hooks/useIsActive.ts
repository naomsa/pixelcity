import { useContractCall, useEthers } from "@usedapp/core";

import { TOKEN_ADDRESS, TOKEN_ABI } from "../constants/contract";
import buildCall from "../utils/buildCall";

function useIsActive() {
	const { chainId } = useEthers();

	const [isActive]: any =
		useContractCall(buildCall(TOKEN_ABI, TOKEN_ADDRESS[chainId], "isActive")) ??
		[];

	return isActive;
}

export default useIsActive;
