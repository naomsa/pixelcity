import { BigNumber } from "@ethersproject/bignumber";
import { useEthers } from "@usedapp/core";
import { useState } from "react";

import ClaimButton from "../components/Claim/ClaimButton";
import ClaimForm from "../components/Claim/ClaimForm";

export default function Claim() {
	const { account } = useEthers();

	const [amount, setAmount] = useState<number>(1);
	const [tip, setTip] = useState<BigNumber>(BigNumber.from(0));

	return (
		<section className="py-12 text-secondary" id="claim">
			<div className="flex flex-col items-center w-2/3 gap-4 mx-auto lg:w-1/2">
				<div className="col-span-2 text-center">
					<span className="text-4xl font-bold">Claim yours!</span>
					<p className="mt-4 text-lg">
						You can claim a pixel city token totally for free on the mainnet. To
						proceed, connect your wallet, select your amount between 1 and 2 and
						then click <strong>claim</strong>!
					</p>
				</div>
				{account ? (
					<div className="flex flex-col col-span-3 gap-4 mt-8 text-center">
						<ClaimForm
							amount={amount}
							setAmount={setAmount}
							tip={tip}
							setTip={setTip}
						/>
						<ClaimButton amount={amount} tip={tip} />
					</div>
				) : (
					<span>Please connect to metamask</span>
				)}
			</div>
		</section>
	);
}
