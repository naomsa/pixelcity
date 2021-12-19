import { Dispatch, useState } from "react";
import { utils, BigNumber } from "ethers";

interface ClaimFormProps {
	amount: number;
	setAmount: Dispatch<number>;
	tip: BigNumber;
	setTip: Dispatch<BigNumber>;
}

export default function ClaimForm({
	amount,
	setAmount,
	tip,
	setTip,
}: ClaimFormProps) {
	return (
		<div className="flex gap-4">
			<select
				className="w-full"
				value={amount}
				onChange={(e) => setAmount(parseInt(e.target.value))}
			>
				<option disabled>Select your mint amount</option>
				<option value={1}>1</option>
				<option value={2}>2</option>
			</select>
			<select
				className="w-full"
				value={Number(utils.formatEther(tip))}
				onChange={(e) => setTip(utils.parseEther(`${e.target.value}`))}
			>
				<option disabled>Select your tip amount</option>
				<option value={0.1}>0.1 ETH</option>
				<option value={0.2}>0.2 ETH</option>
				<option value={0.3}>0.3 ETH</option>
				<option value={0.4}>0.4 ETH</option>
				<option value={0.5}>0.5 ETH</option>
				<option value={0.6}>0.6 ETH</option>
				<option value={0.7}>0.7 ETH</option>
				<option value={0.8}>0.8 ETH</option>
				<option value={0.9}>0.9 ETH</option>
				<option value={1}>1 ETH</option>
				<option value={0}>0 ETH</option>
			</select>
		</div>
	);
}
