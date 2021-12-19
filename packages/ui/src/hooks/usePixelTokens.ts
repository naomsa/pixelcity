import { useEffect, useState } from "react";
import { useContractCall, useEthers } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";

import { TOKEN_ADDRESS, TOKEN_ABI } from "../constants/contract";
import buildCall from "../utils/buildCall";
import type { Token } from "../interfaces/Token";
import decodeTokenURI from "../utils/decodeTokenURI";

export default function usePixelWallet() {
	const { chainId, account, library } = useEthers();

	const [tokens, setTokens] = useState<Token[]>([]);

	const [wallet]: any =
		useContractCall(
			account &&
				buildCall(TOKEN_ABI, TOKEN_ADDRESS[chainId], "walletOfOwner", [account])
		) ?? [];

	useEffect(() => {
		if (wallet?.length && account && library) {
			const fetchTokens = async () => {
				const contract = new Contract(
					TOKEN_ADDRESS[chainId],
					TOKEN_ABI,
					library
				);

				const uris = await Promise.all(
					wallet.map((id: BigNumber) => contract.tokenURI(id.toNumber()))
				);
				setTokens(uris.map((token) => decodeTokenURI(token)));
			};
			fetchTokens();
		} else setTokens([]);
	}, [wallet]);

	return tokens;
}
