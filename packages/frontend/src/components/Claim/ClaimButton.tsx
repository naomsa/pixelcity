import { BigNumber } from "@ethersproject/bignumber";

import TransactionLogger from "../TransactionLogger";
import useClaimPixels from "../../hooks/useClaimPixels";

interface ClaimButtonProps {
	amount: number;
	tip: BigNumber;
}

export default function ClaimButton({ amount, tip }: ClaimButtonProps) {
	const { claim, claimState } = useClaimPixels();

	const onClick = () => {
		if (amount !== 1 && amount !== 2) return;
		if (tip.lt(0) && tip.gt(10)) return;

		claim(amount, { value: tip });
	};

	return (
		<>
			<button onClick={onClick}>Claim</button>
			<TransactionLogger tx={claimState} />
		</>
	);
}
