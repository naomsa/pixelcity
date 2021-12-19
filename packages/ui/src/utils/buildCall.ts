import { ContractCall } from "@usedapp/core";
import { Interface } from "@ethersproject/abi";

export default function buildCall(
	abi: Interface,
	address: string,
	method: string,
	args?: any[]
) {
	const contractCall: ContractCall = {
		abi,
		address,
		method,
		args,
	};

	return contractCall;
}
